'use client';
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  FieldValues,
  Path,
  ControllerRenderProps,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { success, ZodType } from 'zod';
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants';
import {
  FormControl,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import Link from 'next/link';
import { Input } from './ui/input';
import ImageUpload from './ImageUpload';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const isSignIn = type === 'SIGN_IN';
  const router = useRouter();

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    console.log(result);

    if(result.success) {
      console.log(success);

      router.push('/')
    }


  };

  return (
    <div className=''>
      <h1>
        {isSignIn ? 'Welcome back to bookwise' : 'Create your library account'}
      </h1>
      <p className="">
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all fields and upload a valid university ID to gain access to the library'}
      </p>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-3">
          {Object.keys(defaultValues).map((fieldKey) => (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey as Path<T>}
              render={({ field }: { field: ControllerRenderProps<T> }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[fieldKey as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {fieldKey === 'universityCard' ? (
                      <ImageUpload onFileChange={field.onChange}  />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[fieldKey as keyof typeof FIELD_TYPES] ||
                          'text'
                        }
                        className="form-input"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    {isSignIn
                      ? 'Enter your credentials'
                      : 'This is your public display'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to bookwise?' : 'Already have an account?'}{' '}
        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
          {isSignIn ? 'Create an account' : 'Sign In'}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
