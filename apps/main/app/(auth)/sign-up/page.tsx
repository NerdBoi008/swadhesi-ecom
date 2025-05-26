import SignUpForm from '@/components/forms/signup-form'
import React from 'react'

const SignUpPage = () => {
  return (
    <section>
      <SignUpForm/>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-5">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </section>
  )
}

export default SignUpPage