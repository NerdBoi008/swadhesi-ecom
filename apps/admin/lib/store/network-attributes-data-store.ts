import { create } from "zustand";
import {
  getAllAttributesWithValues,
  addAttribute as dbAddAttribute,        // Renamed to avoid conflict with store action name
  addAttributeValue as dbAddAttributeValue, // Renamed
  updateAttribute as dbUpdateAttribute,    // Renamed
  updateAttributeValue as dbUpdateAttributeValue, // Renamed
  deleteAttributeValue as dbDeleteAttributeValue, // Renamed
  deleteAttribute as dbDeleteAttribute, // Renamed
} from "@repo/db";
import { Attribute, AttributeValue } from "@repo/db/types";

// Extend the Prisma Attribute type to include its values for the store
// This is the shape you expect when fetching attributes with their nested values
type AttributeWithValues = Attribute & { values: AttributeValue[] };

// 1. Define the store's state and actions interface
type AttributeStore = {
  attributes: AttributeWithValues[];
  loading: boolean;
  error: string | null;

  // Fetch action
  fetchAttributes: (force?: boolean) => Promise<void>;

  /**
   * Adds a new attribute and its values to the database and updates the store.
   * @param attributeData - The data for the new attribute (name, displayOrder) and its values.
   */
  createAttribute: (attributeData: {
    name: string;
    displayOrder?: number | null;
    values: Array<{ value: string; displayOrder?: number | null; }>;
  }) => Promise<AttributeWithValues>;

  /**
   * Updates an existing attribute and its associated values in the database and store.
   * Handles creation, update, and deletion of individual values.
   * @param attributeId - The ID of the attribute to update.
   * @param updateData - The main attribute data to update (name, displayOrder).
   * @param formValues - The complete list of values from the form (including new, existing, and removed).
   * @returns Promise resolving with the updated AttributeWithValues.
   */
  updateAttributeAndValues: (
    attributeId: string,
    updateData: { name: string; displayOrder?: number | null; },
    formValues: Array<{ id?: string; value: string; displayOrder?: number | null; }>
  ) => Promise<AttributeWithValues>;


  /**
   * Deletes an attribute from the database and updates the store.
   * @param attributeId - The ID of the attribute to delete.
   */
  deleteAttribute: (attributeId: string) => Promise<void>; // Assuming you'll add this backend function
};

// 2. Create the Zustand store
const useAttributeDataStore = create<AttributeStore>(
  (set, get) => ({
    // Initial state
    attributes: [],
    loading: false,
    error: null,

    // Fetch action (remains largely the same)
    fetchAttributes: async (force = false) => {
      if (get().loading) {
        console.log("Skipping attribute fetch: Already loading.");
        return;
      }
      if (!force && get().attributes.length > 0) {
        console.log("Skipping attribute fetch: Attributes exist and force is false.");
        return;
      }

      set({ loading: true, error: null });
      console.log(`Workspaceing attributes... (force=${force})`);

      try {
        const response = await getAllAttributesWithValues();
        if (response && Array.isArray(response)) {
          set({ attributes: response as AttributeWithValues[], loading: false });
          console.log("Attributes updated in store.");
        } else {
          console.warn("Received unexpected response format for attributes:", response);
          set({ loading: false, error: "Received unexpected data format for attributes." });
        }
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        set({ error: errorMessage, loading: false });
        // Don't re-throw here, let the caller handle success/failure of fetch
      }
    },

    createAttribute: async (attributeData) => {
      set({ loading: true, error: null }); // Set loading for mutation
      try {
        // 1. Create the Attribute
        const newAttribute = await dbAddAttribute({
          name: attributeData.name,
          display_order: attributeData.displayOrder ?? null,
        });

        // 2. Then, loop through the values and add them
        const createdValues: AttributeValue[] = [];
        for (const val of attributeData.values) {
          const createdValue = await dbAddAttributeValue({
            attribute_id: newAttribute.id,
            value: val.value,
            display_order: val.displayOrder ?? null,
          });
          createdValues.push(createdValue);
        }

        // 3. Re-fetch all attributes to ensure store is consistent with new data (including new IDs)
        await get().fetchAttributes(true); // Force refetch

        const finalAttribute: AttributeWithValues = { ...newAttribute, values: createdValues };
        set({ loading: false });
        return finalAttribute;

      } catch (error) {
        console.error("Failed to create attribute:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        set({ error: errorMessage, loading: false });
        return Promise.reject(new Error(errorMessage)); // Reject to allow UI to catch
      }
    },

    updateAttributeAndValues: async (attributeId, updateData, formValues) => {
      set({ loading: true, error: null });
      try {
        const currentAttributes = get().attributes;
        const originalAttribute = currentAttributes.find(attr => attr.id === attributeId);

        if (!originalAttribute) {
          throw new Error(`Attribute with ID ${attributeId} not found in store.`);
        }

        // 1. Update the main Attribute record
        await dbUpdateAttribute(attributeId, {
          name: updateData.name,
          display_order: updateData.displayOrder ?? null,
        });

        // 2. Handle Attribute Values: Identify new, updated, and deleted values
        const currentDbValues = originalAttribute.values;

        const valuesToCreate = formValues.filter(v => !v.id);
        const valuesToUpdate = formValues.filter(v => v.id && currentDbValues.some(dbVal => dbVal.id === v.id));
        const valuesToDelete = currentDbValues.filter(dbVal =>
          !formValues.some(formVal => formVal.id === dbVal.id)
        );

        // Execute deletions
        for (const valToDelete of valuesToDelete) {
          await dbDeleteAttributeValue(valToDelete.id);
        }

        // Execute updates
        for (const valToUpdate of valuesToUpdate) {
          if (valToUpdate.id) {
            await dbUpdateAttributeValue(valToUpdate.id, {
              value: valToUpdate.value,
              display_order: valToUpdate.displayOrder ?? null,
            });
          }
        }

        // Execute creations
        for (const valToCreate of valuesToCreate) {
          await dbAddAttributeValue({
            attribute_id: attributeId,
            value: valToCreate.value,
            display_order: valToCreate.displayOrder ?? null,
          });
        }

        // 3. Re-fetch all attributes to ensure store is consistent
        await get().fetchAttributes(true);

        // Find and return the updated attribute from the newly fetched data
        const updatedAttributeFromDb = get().attributes.find(attr => attr.id === attributeId);
        if (!updatedAttributeFromDb) {
            throw new Error("Updated attribute not found after refetch.");
        }
        set({ loading: false });
        return updatedAttributeFromDb;

      } catch (error) {
        console.error("Failed to update attribute and values:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        set({ error: errorMessage, loading: false });
        return Promise.reject(new Error(errorMessage));
      }
    },

    deleteAttribute: async (attributeId) => {
        set({ loading: true, error: null });
        try {
          // Call the backend function to delete the attribute.
          // this single call will also delete all associated values.
          await dbDeleteAttribute(attributeId);
  
          // After successful deletion, force a refetch to update the store's state.
          await get().fetchAttributes(true);
          set({ loading: false });
          console.log(`Attribute ${attributeId} and its values deleted successfully.`);
        } catch (error) {
          console.error(`Failed to delete attribute ${attributeId}:`, error);
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
          set({ error: errorMessage, loading: false });
          return Promise.reject(new Error(errorMessage));
        }
      }
  }),
);

export default useAttributeDataStore;