"use client"

import { Order } from "@repo/types";

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleIcon,
  ClockIcon,
  CogIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MailIcon,
  MoreVerticalIcon,
  PackageCheckIcon,
  PlusIcon,
  PrinterIcon,
  RefreshCwIcon,
  RotateCwIcon,
  TruckIcon,
  Undo2Icon,
  WalletCardsIcon,
  XCircleIcon,
  XOctagonIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { z } from "zod";
import { cn } from "@/lib/utils";


// Base schemas
const dateSchema = z.union([z.date(), z.string().datetime()]).transform((val) => new Date(val));

const baseEntitySchema = z.object({
  id: z.string(),
  created_at: dateSchema,
  updated_at: dateSchema,
});

const addressSchema = z.object({
  id: z.string().optional(),
  customer_id: z.union([z.number(), z.null()]).optional(),
  recipient_name: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
  contact_number: z.string(),
  is_default: z.boolean().optional(),
  type: z.enum(['shipping', 'billing']).optional(),
});

const orderStatusSchema = z.enum([
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned',
  'Refunded'
]);

const paymentStatusSchema = z.enum([
  'Pending',
  'Paid',
  'Refunded',
  'Partially_Refunded',
  'Failed'
]);

const paymentMethodSchema = z.enum([
  'COD',
  'UPI',
  'Net_Banking',
  'Credit_Card',
  'Debit_Card',
  'Wallet',
  'EMI',
  'Gift_Card'
]);

const shippingCarrierSchema = z.enum([
  'FedEx',
  'UPS',
  'USPS',
  'DHL',
  'BlueDart',
  'Delhivery',
  'Custom'
]);

// Order Item schema
const orderItemSchema = z.object({
  id: z.string().optional(),
  order_id: z.string(),
  product_id: z.string(),
  variant_id: z.string(),
  quantity: z.number().min(1),
  price_at_purchase: z.number().min(0),
  variant_sku: z.string(),
  variant_attributes: z.record(z.string()),
  refunded_quantity: z.number().min(0).optional(),
  refund_amount: z.number().min(0).optional(),
});

// Main Order schema
const orderSchema = baseEntitySchema.extend({
  customer_id: z.string().nullable(),
  status: orderStatusSchema,
  total_amount: z.number().min(0),
  shipping_address: z.union([addressSchema, z.string()]),
  billing_address: z.union([addressSchema, z.string()]).optional(),
  payment_status: paymentStatusSchema,
  payment_method: paymentMethodSchema,
  shipping_cost: z.number().min(0),
  tax_amount: z.number().min(0),
  discount_amount: z.number().min(0).optional(),
  tracking_number: z.string().optional(),
  carrier: shippingCarrierSchema.optional(),
  notes: z.string().optional(),
  estimated_delivery: dateSchema.optional(),
  items: z.array(orderItemSchema),
  coupon_code: z.string().optional(),
});

// Type exports
export type OrderSchema = z.infer<typeof orderSchema>;
export type OrderItemSchema = z.infer<typeof orderItemSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <TableCellViewer order={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        Pending: {
          icon: <ClockIcon className="text-amber-500 dark:text-amber-400" />,
          className: "text-amber-600 dark:text-amber-400",
          label: "Pending",
        },
        Processing: {
          icon: <CogIcon className="animate-spin text-blue-500 dark:text-blue-400" />,
          className: "text-blue-600 dark:text-blue-400",
          label: "Processing",
        },
        Shipped: {
          icon: <TruckIcon className="text-indigo-500 dark:text-indigo-400" />,
          className: "text-indigo-600 dark:text-indigo-400",
          label: "Shipped",
        },
        Delivered: {
          icon: <PackageCheckIcon className="text-green-500 dark:text-green-400" />,
          className: "text-green-600 dark:text-green-400",
          label: "Delivered",
        },
        Cancelled: {
          icon: <XOctagonIcon className="text-red-500 dark:text-red-400" />,
          className: "text-red-600 dark:text-red-400",
          label: "Cancelled",
        },
        Returned: {
          icon: <RotateCwIcon className="text-purple-500 dark:text-purple-400" />,
          className: "text-purple-600 dark:text-purple-400",
          label: "Returned",
        },
        Refunded: {
          icon: <WalletCardsIcon className="text-emerald-500 dark:text-emerald-400" />,
          className: "text-emerald-600 dark:text-emerald-400",
          label: "Refunded",
        },
      };
  
      const config = statusConfig[status] || {
        icon: <CircleIcon className="text-gray-500 dark:text-gray-400" />,
        className: "text-gray-600 dark:text-gray-400",
        label: status,
      };
  
      return (
        <Badge
          variant="outline"
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${config.className}`}
        >
          {config.icon}
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "customer_id",
    header: "Customer ID",
    cell: ({ row }) => row.original.customer_id || "Guest",
  },
  {
    accessorKey: "total_amount",
    header: "Amount",
    cell: ({ row }) => `₹${row.original.total_amount.toFixed(2)}`,
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.payment_status;
      const statusConfig = {
        Paid: {
          icon: <CheckCircle2Icon className="text-green-500 dark:text-green-400" />,
          className: "text-green-600 dark:text-green-400",
        },
        Pending: {
          icon: <LoaderIcon className="animate-spin text-yellow-500 dark:text-yellow-400" />,
          className: "text-yellow-600 dark:text-yellow-400",
        },
        Refunded: {
          icon: <Undo2Icon className="text-blue-500 dark:text-blue-400" />,
          className: "text-blue-600 dark:text-blue-400",
        },
        Partially_Refunded: {
          icon: <RefreshCwIcon className="text-indigo-500 dark:text-indigo-400" />,
          className: "text-indigo-600 dark:text-indigo-400",
        },
        Failed: {
          icon: <XCircleIcon className="text-red-500 dark:text-red-400" />,
          className: "text-red-600 dark:text-red-400",
        },
      };
  
      const config = statusConfig[status] || {
        icon: <CircleIcon className="text-gray-500 dark:text-gray-400" />,
        className: "text-gray-600 dark:text-gray-400",
      };
  
      return (
        <Badge
          variant="outline"
          className={`flex items-center gap-1 px-2 py-0.5 ${config.className}`}
        >
          {config.icon}
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Order Date",
    cell: ({ row }) => row.original.created_at.toLocaleDateString(),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof orderSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function OrdersTable({
  data: initialData,
}: {
  data: z.infer<typeof orderSchema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs
      defaultValue="latest-orders"
      className="flex w-full flex-col justify-start gap-6 @container/main"
    >
      <div className="flex items-center justify-between">
        
        {/* Select Component */}
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="latest-orders">
          <SelectTrigger
            className="@4xl/main:hidden flex w-fit"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest-orders">Latest Orders</SelectItem>
            <SelectItem value="latest-customer">Latest Customers</SelectItem>
          </SelectContent>
        </Select>

        {/* Tabslist Component */}
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value="latest-orders">Latest Orders</TabsTrigger>
          <TabsTrigger value="past-performance" className="gap-1">
            Latest Customers{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              3
            </Badge>
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id.replace('_', ' ')}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>

      <TabsContent
        value="latest-orders"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="past-performance"
        className="flex flex-col"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      
    </Tabs>
  )
}

function TableCellViewer({ order }: { order: z.infer<typeof orderSchema> }) {
  
  // Parse address if it's a string
  const shippingAddress = typeof order.shipping_address === 'string' 
    ? JSON.parse(order.shipping_address) 
    : order.shipping_address;
  
  const billingAddress = order.billing_address 
    ? (typeof order.billing_address === 'string' 
        ? JSON.parse(order.billing_address) 
        : order.billing_address)
    : null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          Order #{order.id}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Order Details</SheetTitle>
          <SheetDescription>
            {order.customer_id ? `Customer ID: ${order.customer_id}` : 'Guest Order'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 text-sm">
          {/* Order Summary Section */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(
                  "px-2 py-0.5 text-xs",
                  order.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                    order.status === 'Cancelled' ? 'bg-red-50 text-red-700' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                )}>
                  {order.status}
                </Badge>
                <span className="text-muted-foreground">
                  {order.created_at.toLocaleDateString()}
                </span>
              </div>
              <span className="font-medium">
                ₹{order.total_amount.toFixed(2)}
              </span>
            </div>
            
            {order.tracking_number && (
              <div className="mt-3 flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {order.carrier}: {order.tracking_number}
                </span>
              </div>
            )}
          </div>

          {/* Order Items Section */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Items ({order.items.length})</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id || item.product_id} className="flex gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                    {/* Placeholder for product image */}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {item.variant_sku}
                      </span>
                      <span>₹{item.price_at_purchase.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                      {item.refunded_quantity ? (
                        <span className="ml-2 text-red-500">
                          (Refunded: {item.refunded_quantity})
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Object.entries(item.variant_attributes).map(([key, value]) => (
                        <span key={key} className="mr-2">{key}: {value}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-medium">Shipping Info</h3>
              <div className="space-y-1 text-sm">
                <p>{shippingAddress.recipient_name}</p>
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}</p>
                <p>{shippingAddress.country}</p>
                <p className="text-muted-foreground">
                  {shippingAddress.contact_number}
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-medium">Payment Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={cn(
                    "px-2 py-0.5 text-xs",
                    order.payment_status === 'Paid' ? 'bg-green-50 text-green-700' :
                      order.payment_status === 'Failed' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                  )}>
                    {order.payment_status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span>{order.payment_method.replace('_', ' ')}</span>
                </div>
                {order.coupon_code && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coupon:</span>
                    <span>{order.coupon_code}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-medium">Order Notes</h3>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}

          {/* Admin Actions */}
          <Separator />
          <div className="space-y-3">
            <h3 className="font-medium">Order Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <MailIcon className="mr-2 h-4 w-4" />
                Resend Email
              </Button>
              <Button variant="outline" size="sm">
                <TruckIcon className="mr-2 h-4 w-4" />
                Track
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            </div>
          </div>
          
        </div>

        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <Button className="w-full">Save Changes</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}