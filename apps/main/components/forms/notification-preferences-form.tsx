"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import useUserProfileStore from "@/lib/store/user-profile-store";

const notificationPreferencesSchema = z.object({
  email: z.boolean().default(false),
  sms: z.boolean().default(false),
  marketing: z.boolean().default(false),
  order_updates: z.boolean().default(true),
  promotions: z.boolean().default(false),
  newsletters: z.boolean().default(false),
  feedback_requests: z.boolean().default(false),
  account_notifications: z.boolean().default(true),
});

type NotificationPreferencesValues = z.infer<typeof notificationPreferencesSchema>;

export function NotificationPreferencesForm({ customer_id }: { customer_id?: string }
) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserProfileStore((state) => state.user);
  const updateNotificationPreferences = useUserProfileStore(
    (state) => state.updateNotificationPreferences
  );

  const form = useForm<NotificationPreferencesValues>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      email: user?.notification_preferences?.email ?? false,
      sms: user?.notification_preferences?.sms ?? false,
      marketing: user?.notification_preferences?.marketing ?? false,
      order_updates: user?.notification_preferences?.order_updates ?? true,
      promotions: user?.notification_preferences?.promotions ?? false,
      newsletters: user?.notification_preferences?.newsletters ?? false,
      feedback_requests: user?.notification_preferences?.feedback_requests ?? false,
      account_notifications: user?.notification_preferences?.account_notifications ?? true,
    },
  });

  async function onSubmit(data: NotificationPreferencesValues) {
    setIsLoading(true);
    try {
      const result = await updateNotificationPreferences({ customer_id: customer_id || "", ...data});

      if (!result.success) {
        throw new Error(result.message || "Failed to update preferences");
      }

      toast.success("Preferences Updated", {
        description: "Your notification preferences have been saved.",
      });
    } catch (error: any) {
      console.error("Failed to update preferences:", error);
      toast.error("Update Failed", {
        description: error.message || "Failed to update preferences",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Email Notifications</FormLabel>
                <FormDescription>
                  Receive notifications via email
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>SMS Notifications</FormLabel>
                <FormDescription>
                  Receive notifications via SMS
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Marketing Communications</FormLabel>
                <FormDescription>
                  Receive marketing related communications
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order_updates"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Order Updates</FormLabel>
                <FormDescription>
                  Receive updates about your orders
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletters"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Newsletters</FormLabel>
                <FormDescription>
                  Receive our newsletter
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback_requests"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Feedback Requests</FormLabel>
                <FormDescription>
                  Receive requests for product/service feedback
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_notifications"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Account Notifications</FormLabel>
                <FormDescription>
                  Receive important account-related notifications
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}