'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { facebookLink, footerLinks, instagramLink, supportEmail, supportPhone } from '@/lib/constant'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import CustomButton from './CustomButton'
import { InstagramIcon } from '@/public/icons/instagram-icon'
import { FacebookIcon } from '@/public/icons/facebook-icon'

export const formSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim(),
})

const ContactInfo = () => (
  <div className='flex flex-col gap-2'>
    <div className='flex items-center'>
      <PhoneCallIcon className='stroke-muted-foreground inline-block size-4 mr-2' />
      <Link href={`tel:${supportPhone}`} className='hover:underline'>{supportPhone}</Link>
    </div>
    <div className='flex items-center'>
      <MailIcon className='stroke-muted-foreground inline-block size-4 mr-2' />
      <Link href={`mailto:${supportEmail}`} className='hover:underline'>{supportEmail}</Link>
    </div>
    <p className='text-muted-foreground'>We are here to help you!</p>
  </div>
)

const SubscriptionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel className='hidden'>Email</FormLabel>
            <FormControl>
              <Input placeholder="Your email" {...field} />
            </FormControl>
            <FormDescription className='text-xs'>This email will be used to send you updates and offers.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <CustomButton type="submit" className='uppercase cursor-pointer'>
          Subscribe
        </CustomButton>
      </form>
    </Form>
  )
}

const Footer = () => (
  <footer className='container-x-padding flex flex-col justify-center gap-4 py-10'>
    <Separator />

    {/* Mobile Accordion */}
    <Accordion type="single" collapsible className='md:hidden' defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className='font-bold'>DROP US A LINE</AccordionTrigger>
        <AccordionContent><ContactInfo /></AccordionContent>
      </AccordionItem>

      {footerLinks.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 2}`}>
          <AccordionTrigger className='font-bold uppercase'>{item.heading}</AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-2'>
              {item.links.map((link, idx) => (
                <Link key={idx} href={link.path} className='text-muted-foreground text-sm hover:underline'>{link.name}</Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem value="item-last">
        <AccordionTrigger className='font-bold'>THE INSIDE SCOOP</AccordionTrigger>
        <AccordionContent><SubscriptionForm /></AccordionContent>
      </AccordionItem>
    </Accordion>

    {/* Desktop Layout */}
    <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      <div className='flex flex-col gap-4'>
        <h3 className='font-bold'>DROP US A LINE</h3>
        <ContactInfo />
      </div>
      {footerLinks.map((item, index) => (
        <div key={index} className='flex flex-col gap-4'>
          <h3 className='font-bold uppercase'>{item.heading}</h3>
          <div className='flex flex-col gap-2'>
            {item.links.map((link, idx) => (
              <Link key={idx} href={link.path} className='text-muted-foreground text-sm hover:underline'>{link.name}</Link>
            ))}
          </div>
        </div>
      ))}
      <div className='flex flex-col gap-4'>
        <h3 className='font-bold'>THE INSIDE SCOOP</h3>
        <SubscriptionForm />
        <div>
          {instagramLink && (
            <Link href={instagramLink}>
              <InstagramIcon className='size-5 inline mr-4 text-muted-foreground'/>
            </Link>
          )}
          {facebookLink && (
            <Link href={facebookLink}>
              <FacebookIcon className='size-5 inline mr-4 text-muted-foreground'/>
            </Link>
          )}
        </div>
      </div>
    </div>

    <section className='text-xs md:text-sm text-gray-600 mt-5'>
      <p>All website contents are © {new Date().getFullYear()} by TeamNextCraft.</p>
      <p>All rights reserved.</p>      
    </section>
  </footer>
)

export default Footer;