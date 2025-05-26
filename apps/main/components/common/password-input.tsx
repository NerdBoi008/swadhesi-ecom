import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function PasswordInput<FT extends FieldValues>({
    placeholder,
    field, 
    className,
    ...props 
}: {
    placeholder?: string;
    field: ControllerRenderProps<FT, Path<FT>>; // Use specific form type and field name
    } & Omit<React.ComponentProps<"input">, 'type' | 'value' | 'onChange' | 'onBlur' | 'name' | 'ref'>) { // Inherit InputProps but omit RHF field ones
    
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <div className='relative'>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                value={field.value?.toString() || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                {...props}
                className={`pr-10 ${className}`}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground'
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? (
                    <EyeOffIcon className='size-5' />
                ) : (
                    <EyeIcon className='size-5' />
                )}
            </Button>
        </div>
    )
}