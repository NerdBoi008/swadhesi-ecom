'use client'

import { useState } from 'react'
import {
  SettingsIcon,
  CreditCardIcon,
  TruckIcon,
  PercentIcon,
  MailIcon,
  ZapIcon,
  FileTextIcon,
  SaveIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  ChevronUpIcon,
  PlusIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payments' | 'shipping' | 'taxes' | 'emails' | 'integrations' | 'legal'>('general')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Form state (in a real app, this would be managed with a form library like React Hook Form)
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'LittleFashion',
    contactEmail: 'hello@littlefashion.com',
    phoneNumber: '+919876543210',
    address: '123 Kids Plaza, Mumbai, Maharashtra 400001',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false
  })

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setStoreSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Store Settings</h1>
        <Button>
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <TruckIcon className="mr-2 h-4 w-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="taxes">
            <PercentIcon className="mr-2 h-4 w-4" />
            Taxes
          </TabsTrigger>
          <TabsTrigger value="emails">
            <MailIcon className="mr-2 h-4 w-4" />
            Emails
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <ZapIcon className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="legal">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Legal
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    value={storeSettings.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={storeSettings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    value={storeSettings.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Input 
                    id="address" 
                    value={storeSettings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={storeSettings.currency}
                    onValueChange={(value) => handleInputChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={storeSettings.timezone}
                    onValueChange={(value) => handleInputChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">India (Asia/Kolkata)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch 
                  id="maintenanceMode" 
                  checked={storeSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Settings Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/payment-logos/stripe.png" alt="Stripe" className="h-6" />
                    <span className="font-medium">Stripe</span>
                  </div>
                  <Switch id="stripe-enabled" />
                </div>
                
                {expandedSection === 'stripe' ? (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-key">Publishable Key</Label>
                        <Input id="stripe-key" placeholder="pk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input id="stripe-secret" placeholder="sk_test_..." type="password" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                      <Input id="stripe-webhook" placeholder="whsec_..." type="password" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toggleSectionExpansion('stripe')}>
                      <ChevronUpIcon className="mr-2 h-4 w-4" />
                      Hide Details
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => toggleSectionExpansion('stripe')}
                  >
                    <ChevronDownIcon className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                )}
              </div>
              
              {/* PayPal */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/payment-logos/paypal.png" alt="PayPal" className="h-6" />
                    <span className="font-medium">PayPal</span>
                  </div>
                  <Switch id="paypal-enabled" />
                </div>
                
                {expandedSection === 'paypal' && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">Client ID</Label>
                      <Input id="paypal-client-id" placeholder="AeA..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">Secret Key</Label>
                      <Input id="paypal-secret" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="paypal-sandbox" />
                      <Label htmlFor="paypal-sandbox">Sandbox Mode</Label>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toggleSectionExpansion('paypal')}>
                      <ChevronUpIcon className="mr-2 h-4 w-4" />
                      Hide Details
                    </Button>
                  </div>
                )}
              </div>
              
              {/* COD */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCardIcon className="h-6 w-6" />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <Switch id="cod-enabled" checked />
                </div>
              </div>
              
              {/* UPI */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/payment-logos/upi.png" alt="UPI" className="h-6" />
                    <span className="font-medium">UPI Payments</span>
                  </div>
                  <Switch id="upi-enabled" checked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings Tab */}
        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Zones */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="h-5 w-5" />
                    <span className="font-medium">Shipping Zones</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Zone
                  </Button>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Domestic (India)</div>
                        <div className="text-sm text-muted-foreground">All states in India</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium">Shipping Methods:</div>
                      <ul className="list-disc pl-5">
                        <li>Standard Shipping - ₹50 (3-5 business days)</li>
                        <li>Express Shipping - ₹120 (1-2 business days)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">International</div>
                        <div className="text-sm text-muted-foreground">All other countries</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium">Shipping Methods:</div>
                      <ul className="list-disc pl-5">
                        <li>Standard International - ₹500 (10-15 business days)</li>
                        <li>Express International - ₹1200 (5-7 business days)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipping Carriers */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="h-5 w-5" />
                    <span className="font-medium">Shipping Carriers</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Carrier
                  </Button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <img src="/shipping-logos/delhivery.png" alt="Delhivery" className="h-6" />
                      <span>Delhivery</span>
                    </div>
                    <Switch id="delhivery-enabled" checked />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <img src="/shipping-logos/bluedart.png" alt="BlueDart" className="h-6" />
                      <span>BlueDart</span>
                    </div>
                    <Switch id="bluedart-enabled" checked />
                  </div>
                  
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-3">
                      <img src="/shipping-logos/dhl.png" alt="DHL" className="h-6" />
                      <span>DHL</span>
                    </div>
                    <Switch id="dhl-enabled" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Taxes Settings Tab */}
        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tax Calculation</Label>
                <Select defaultValue="store">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax calculation method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store">Calculate tax based on store address</SelectItem>
                    <SelectItem value="customer">Calculate tax based on customer address</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Store Tax Location</Label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Select defaultValue="India">
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="Maharashtra">
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="ZIP/Postal Code" defaultValue="400001" />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <Label>Tax Rates</Label>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-12 items-center border-b p-3 font-medium">
                    <div className="col-span-4">Region</div>
                    <div className="col-span-3">Rate</div>
                    <div className="col-span-4">Tax Name</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-12 items-center border-b p-3">
                    <div className="col-span-4">India - Maharashtra</div>
                    <div className="col-span-3">5%</div>
                    <div className="col-span-4">GST</div>
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 items-center border-b p-3">
                    <div className="col-span-4">India - Other States</div>
                    <div className="col-span-3">12%</div>
                    <div className="col-span-4">IGST</div>
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <Button variant="outline" size="sm">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Tax Rate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Order Confirmation</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Shipping Notification</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Password Reset</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Account Welcome</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/integration-logos/google-analytics.png" alt="Google Analytics" className="h-6" />
                    <span className="font-medium">Google Analytics</span>
                  </div>
                  <Switch id="ga-enabled" />
                </div>
                
                {expandedSection === 'ga' && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ga-tracking-id">Tracking ID</Label>
                      <Input id="ga-tracking-id" placeholder="UA-XXXXX-Y" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toggleSectionExpansion('ga')}>
                      <ChevronUpIcon className="mr-2 h-4 w-4" />
                      Hide Details
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/integration-logos/mailchimp.png" alt="Mailchimp" className="h-6" />
                    <span className="font-medium">Mailchimp</span>
                  </div>
                  <Switch id="mailchimp-enabled" />
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/integration-logos/quickbooks.png" alt="QuickBooks" className="h-6" />
                    <span className="font-medium">QuickBooks</span>
                  </div>
                  <Switch id="quickbooks-enabled" />
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/integration-logos/zapier.png" alt="Zapier" className="h-6" />
                    <span className="font-medium">Zapier</span>
                  </div>
                  <Switch id="zapier-enabled" checked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal Pages Tab */}
        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Privacy Policy</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Terms of Service</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Return & Refund Policy</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Shipping Policy</div>
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}