'use client'

import { useState } from 'react'
import {
  UsersIcon,
  KeyIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  MoreVerticalIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

// Mock data
const adminUsers = [
  {
    id: 'admin_1',
    name: 'Priya Sharma',
    email: 'priya@littlefashion.com',
    role: 'Administrator',
    lastLogin: new Date('2023-06-25T09:15:00'),
    status: 'active',
    permissions: ['all']
  },
  {
    id: 'admin_2',
    name: 'Rahul Patel',
    email: 'rahul@littlefashion.com',
    role: 'Product Manager',
    lastLogin: new Date('2023-06-24T14:30:00'),
    status: 'active',
    permissions: ['products', 'categories', 'collections']
  },
  {
    id: 'admin_3',
    name: 'Ananya Gupta',
    email: 'ananya@littlefashion.com',
    role: 'Order Manager',
    lastLogin: new Date('2023-06-22T11:20:00'),
    status: 'active',
    permissions: ['orders', 'customers']
  },
  {
    id: 'admin_4',
    name: 'Vikram Singh',
    email: 'vikram@littlefashion.com',
    role: 'Content Editor',
    lastLogin: new Date('2023-06-20T16:45:00'),
    status: 'inactive',
    permissions: ['pages', 'blog', 'banners']
  }
]

const availableRoles = [
  { id: 'admin', name: 'Administrator', description: 'Full access to all features' },
  { id: 'product', name: 'Product Manager', description: 'Manage products, categories, and collections' },
  { id: 'order', name: 'Order Manager', description: 'Manage orders and customers' },
  { id: 'content', name: 'Content Editor', description: 'Manage pages, blog, and marketing content' },
  { id: 'report', name: 'Reporting', description: 'View reports and analytics' }
]

const availablePermissions = [
  { id: 'dashboard', label: 'View Dashboard' },
  { id: 'products', label: 'Manage Products' },
  { id: 'orders', label: 'Manage Orders' },
  { id: 'customers', label: 'Manage Customers' },
  { id: 'categories', label: 'Manage Categories' },
  { id: 'collections', label: 'Manage Collections' },
  { id: 'pages', label: 'Manage Pages' },
  { id: 'blog', label: 'Manage Blog' },
  { id: 'marketing', label: 'Manage Marketing' },
  { id: 'reports', label: 'View Reports' },
  { id: 'settings', label: 'Manage Settings' }
]

export default function AdminUserManagementPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    permissions: [] as string[]
  })

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    )
  }

  const toggleUserExpansion = (userId: string) => {
    setExpandedUser(prev => prev === userId ? null : userId)
  }

  const togglePermission = (permissionId: string) => {
    setNewUser(prev => {
      if (prev.permissions.includes(permissionId)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(id => id !== permissionId)
        }
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permissionId]
        }
      }
    })
  }

  const statusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge variant="default">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin User Management</h1>
        <Button onClick={() => setIsAddingUser(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Admin User
        </Button>
      </div>

      {/* Add User Modal */}
      {isAddingUser && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Admin User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {availablePermissions.map(permission => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`perm-${permission.id}`}
                      checked={newUser.permissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <label
                      htmlFor={`perm-${permission.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setIsAddingUser(false)
              setNewUser({ name: '', email: '', role: '', permissions: [] })
            }}>
              Cancel
            </Button>
            <Button>
              <CheckIcon className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search admin users..." 
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[150px]">
              <FilterIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {availableRoles.map(role => (
                <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px]">
              <FilterIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">
            {selectedUsers.length} selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Activate
            </Button>
            <Button variant="outline" size="sm">
              Deactivate
            </Button>
            <Button variant="outline" size="sm" className="text-red-500">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <>
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <UsersIcon className="h-5 w-5" />
                        </div>
                        <div>
                          {user.name}
                          <div className="text-xs text-muted-foreground">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {statusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleUserExpansion(user.id)}
                        >
                          {expandedUser === user.id ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <KeyIcon className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            {user.status === 'active' ? (
                              <DropdownMenuItem className="text-red-500">
                                <XIcon className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <CheckIcon className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-500">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedUser === user.id && (
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={6}>
                        <div className="p-4">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* User Details */}
                            <div className="space-y-4">
                              <h3 className="font-medium">User Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Name:</span>
                                  <span className="font-medium">{user.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Email:</span>
                                  <span>{user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Role:</span>
                                  <span>{user.role}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span>{statusBadge(user.status)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Last Login:</span>
                                  <span>{user.lastLogin.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Permissions */}
                            <div className="space-y-4">
                              <h3 className="font-medium">Permissions</h3>
                              <div className="flex flex-wrap gap-2">
                                {user.permissions.includes('all') ? (
                                  <Badge variant="default">Full Access</Badge>
                                ) : (
                                  availablePermissions
                                    .filter(perm => user.permissions.includes(perm.id))
                                    .map(perm => (
                                      <Badge key={perm.id} variant="outline">
                                        {perm.label}
                                      </Badge>
                                    ))
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex flex-wrap gap-2">
                            <Button>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit User
                            </Button>
                            <Button variant="outline">
                              <KeyIcon className="mr-2 h-4 w-4" />
                              Reset Password
                            </Button>
                            {user.status === 'active' ? (
                              <Button variant="outline" className="text-red-500">
                                <XIcon className="mr-2 h-4 w-4" />
                                Deactivate
                              </Button>
                            ) : (
                              <Button variant="outline">
                                <CheckIcon className="mr-2 h-4 w-4" />
                                Activate
                              </Button>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> admin users
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Roles Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Roles & Permissions</CardTitle>
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableRoles.map(role => (
              <div key={role.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <EditIcon className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}