'use client'

import { faqQuestions, supportAddress, supportEmail, supportPhone } from '@/lib/constant'
import { ClockIcon, MailIcon, MapPinHouseIcon, PhoneCallIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().trim(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format"),
  message: z.string().min(10).max(200).trim(),
  trapInput: z.string().optional(),
})

const ContactPage = () => {

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })
 
  async function onSubmit({ name, email, phone, message, trapInput}: z.infer<typeof formSchema>) {
    
    //Skip if trapInput is filled. remedy for bots
    if (trapInput) return;

    const token = await recaptchaRef.current?.executeAsync();
    if (!token) {
      alert('Please complete the CAPTCHA');
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          recaptchaToken: token,
          submissionTime: Date.now(),
        })
      })

      if (!response.ok) {
        throw new Error("Submission failed!");
      }

    } catch (error) {
      
    }
  }

  return (
    <main className='flex-1 '>
      <section className='flex gap-4 h-fit justify-center items-center flex-col lg:flex-row lg:gap-8 container-x-padding'>
        <Image
          src={'/cdn-imgs/hero_img_5.jpg'}
          alt={'About Image'}
          height={800}
          width={600}
          priority
          className='w-full h-96 object-cover'
        />
        <div className='flex flex-col gap-3 justify-center p-6'>
          <h1 className='text-2xl font-extrabold'>Heading of the Text</h1>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt asperiores quod debitis architecto exercitationem ipsam facilis suscipit nihil provident natus iusto voluptate, labore blanditiis magni est tempora voluptatibus tempore voluptatum! </p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt asperiores quod debitis architecto exercitationem ipsam facilis suscipit nihil provident natus iusto voluptate, labore blanditiis magni est tempora voluptatibus tempore voluptatum! </p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt asperiores quod debitis architecto exercitationem ipsam facilis suscipit nihil provident natus iusto voluptate, labore blanditiis magni est tempora voluptatibus tempore voluptatum! </p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt asperiores quod debitis architecto exercitationem ipsam facilis suscipit nihil provident natus iusto voluptate, labore blanditiis magni est tempora voluptatibus tempore voluptatum! </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className='bg-gray-200 py-8 container-x-padding grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <MapPinHouseIcon />
          <h3 className='text-xl font-semibold'>Address</h3>
          <div className='text-center'>
            {supportAddress.map((line, index) => (
              <p key={index} className='text-sm'>{line}</p>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <PhoneCallIcon />
          <h3 className='text-xl font-semibold'>Call us</h3>
          <Link href={`tel:${supportPhone}`} className='hover:underline text-sm'>{supportPhone}</Link>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <MailIcon />
          <h3 className='text-xl font-semibold'>Email</h3>
          <Link href={`mailto:${supportEmail}`} className='hover:underline text-sm'>{supportEmail}</Link>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <ClockIcon />
          <h3 className='text-xl font-semibold'>Timings</h3>
          <div className='text-center'>
            <p className='text-sm'>10:20 AM - 6:00 PM</p>
            <p className='text-sm'>Monday - Friday</p>
          </div>
        </div>
      </section>

      {/* Inquiry section */}
      <section className='container-x-padding flex flex-col gap-6 py-6'>
        <div className='text-center'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Got Any Questions?</h1>
          <p className='text-xs md:text-sm text-muted-foreground mt-3'>Use this form below to get in touch in with the sales team</p>
        </div>

        <div className='flex justify-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1/2 lg:max-w-1/2">

              <div className='flex gap-3'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='hidden'>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='hidden'>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='hidden'>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='hidden'>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='trapInput'
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel className='hidden'>Trapp</FormLabel>
                    <FormControl>
                      <Input placeholder="Trapp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <ReCAPTCHA
                sitekey={''}
                ref={recaptchaRef}
                size='invisible'
              /> */}

              <Button type="submit" className='uppercase cursor-pointer'>Send</Button>
            </form>
          </Form>

        </div>
        <div className='text-center text-sm'>
          <p>
            This is protected by ReCAPTCHA and google
            {' '}
            <Link href={'https://policies.google.com/privacy'} className='underline'>Privacy Policy</Link>
            {' '}
            and
            {' '}
            <Link href={'https://policies.google.com/privacy'} className='underline'>Terms of Service</Link>
            {' '}
            apply.
          </p>
        </div>
      </section>

      {/* MAP section */}
      <section className='bg-primary-foreground flex items-center justify-center h-96'>
        <p>Map goes here...</p>
      </section>

      {/* FAQ section */}
      <section className='container-x-padding flex flex-col justify-center items-center'>
        <h1 className='text-4xl mt-6 font-secondary'>FAQs</h1>
        <p className='text-sm mt-2 text-muted-foreground'>Below are some of the common questions</p>
        <div className='w-full sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-2xl'>
          <Accordion type="single" collapsible className=''>
            {faqQuestions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Images section */}
      <section className='bg-primary-foreground flex items-center justify-center h-96'>
        <p>Images goes here...</p>
      </section>

    </main>
  )
}

export default ContactPage