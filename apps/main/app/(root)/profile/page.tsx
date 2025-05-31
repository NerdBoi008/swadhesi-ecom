"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatCurrency } from "@/lib/utils";
import useUserProfileStore from "@/lib/store/user-profile-store";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordUpdateForm } from "@/components/forms/password-update-form";
import { Customer, CustomerStatus, Order, OrderStatus } from "@repo/types";
import { NotificationPreferencesForm } from "@/components/forms/notification-preferences-form";

export default function ProfilePage() {
  const router = useRouter();

  const isLodaing = useUserProfileStore((state) => state.isLoading);
  const customer: Customer | null = useUserProfileStore((state) => state.user);
  const deleteUser = useUserProfileStore((state) => state.deleteUser);
  const orders: Order[] = customer?.orders || [];

  const fetchUserProfile = useUserProfileStore(
    (state) => state.fetchUserProfile
  );

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  
  if (!customer) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="rounded-lg border bg-card p-6 animate-pulse">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-muted" />
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-5 w-1/4 rounded bg-muted" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-1/3 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-4/5 rounded bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-1/4 rounded bg-muted" />
                  <div className="h-3 w-3/4 rounded bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-1/3 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                </div>

                <div className="h-[1px] w-full bg-muted my-4" />

                <div className="h-9 w-full rounded bg-muted" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Tabs Skeleton */}
            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />

            {/* Overview Tab Skeleton */}
            <div className="rounded-lg border bg-card p-6 animate-pulse">
              <div className="h-7 w-1/3 rounded bg-muted mb-6" />

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-1/4 rounded bg-muted" />
                    <div className="h-9 w-full rounded bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-1/4 rounded bg-muted" />
                    <div className="h-9 w-full rounded bg-muted" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-1/6 rounded bg-muted" />
                  <div className="h-9 w-full rounded bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-1/6 rounded bg-muted" />
                  <div className="h-9 w-full rounded bg-muted" />
                </div>
              </div>
            </div>

            {/* Orders Tab Skeleton (hidden by default but included for completeness) */}
            <div className="hidden rounded-lg border bg-card p-6 animate-pulse">
              <div className="h-7 w-1/4 rounded bg-muted mb-6" />

              <div className="space-y-4">
                <div className="h-10 w-full rounded bg-muted" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 w-full rounded bg-muted" />
                ))}
              </div>
            </div>

            {/* Addresses Tab Skeleton (hidden by default) */}
            <div className="hidden rounded-lg border bg-card p-6 animate-pulse">
              <div className="h-7 w-1/4 rounded bg-muted mb-6" />

              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-32 w-full rounded bg-muted" />
                ))}
                <div className="h-9 w-full rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    if (isLodaing) return;

    try {
      const result = await deleteUser();

      if (result.success) {
        toast.success("Account Deleted", {
          description: "Your account has been successfully deleted.",
        });
        router.push("/");
        router.refresh();
      } else {
        throw new Error(result.message || "Failed to delete account");
      }
    } catch (error: any) {
      console.error("Account deletion error:", error);
      toast.error("Failed to Delete Account", {
        description: error.message || "Please try again later",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader className="items-center">
              <div className="text-center">
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <p className="text-muted-foreground">{customer.email}</p>
                <Badge
                  variant={ (customer.status === CustomerStatus.Active && !customer.is_guest)
                      ? "default"
                      : customer.status === CustomerStatus.Inactive
                        ? "secondary"
                        : "destructive"
                  }
                  className="mt-2"
                >
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold ">Account Information</h3>
                <p className="text-sm text-muted-foreground">
                  Member since {formatDate(customer.created_at)}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                  Last login {formatDate(customer.last_login)}
                </p> */}
              </div>

              <div>
                <h3 className="font-bold text-sm">Contact</h3>
                <p className="text-sm">{customer.phone}</p>
              </div>

              <div>
                <h3 className="font-bold text-sm">Order Stats</h3>
                <p className="text-sm">
                  {customer.order_count} orders •{" "}
                  {formatCurrency(customer.total_spent)}
                </p>
              </div>

              <Separator />

              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Account Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1 font-bold">First Name</Label>
                      <Input value={customer.first_name} readOnly />
                    </div>
                    <div>
                      <Label className="mb-1 font-bold">Last Name</Label>
                      <Input value={customer.last_name} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1 font-bold">Email</Label>
                    <Input value={customer.email} readOnly />
                  </div>
                  <div>
                    <Label className="mb-1 font-bold">Phone</Label>
                    <Input value={customer.phone || ""} readOnly />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              #
                              {order?.id?.split("_")?.[1]?.toUpperCase() ??
                                "N/A"}
                            </TableCell>
                            <TableCell>
                              {formatDate(order.created_at)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === OrderStatus.Delivered
                                    ? "default"
                                    : order.status === OrderStatus.Cancelled
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatCurrency(order.total_amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No orders found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {customer.addresses?.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              <p className="font-bold inline">
                                {address.recipient_name}
                              </p>
                              {address.is_default && (
                                <Badge variant="secondary" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm">
                              {address.street}, {address.city}, {address.state}{" "}
                              {address.postal_code}
                            </p>
                            <p className="text-sm">{address.country}</p>
                            <p className="text-sm mt-2">
                              Phone: {address.contact_number}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {address.type}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <PasswordUpdateForm/>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">
                      Notification Preferences
                    </h3>
                    <NotificationPreferencesForm customer_id={customer.id}/>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 text-destructive">
                      Delete Account
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This will permanently delete your account and all
                      associated data.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-800 hover:bg-red-600 cursor-pointer"
                            onClick={handleDeleteAccount}
                          >
                            {isLodaing ? (
                              <>
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                Deleting...
                              </>
                            ) : (
                              "Continue"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
