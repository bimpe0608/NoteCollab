import { Separator } from '../../components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';

import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/use-toast';
import SettingsLayout from '../../components/layout/settings/setting-layout';
import { ToastAction } from '../../components/ui/toast';
import { UserProfile, useAuth } from '../../context/GoogleAuthContext';
import { useState, useEffect } from 'react';
import { Course, Year, useNote } from '../../context/NotesContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Timestamp } from '@firebase/firestore';
import { Loader, Loader2 } from 'lucide-react';
import userService from '../../service/user.service';

const accountFormSchema = z.object({
  gender: z.string(),
  country: z.string(),
  displayName: z.string(),
  email: z.string(),
  courseId: z.any(),
  yearId: z.any(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function SettingsAccountPage() {
  const { user, appLoading, userProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchCourse, fetchYear } = useNote();
  const [year, setYear] = useState<Year[] | any[]>([]);
  const [course, setCourse] = useState<Course[] | any[]>([]);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      gender: user?.gender || '',
      country: user?.country || '',
      displayName: user?.displayName || '',
      email: user?.email || '',
      courseId: user.courseId || '',
      yearId: user.yearId || '',
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        let [a, b] = await Promise.all([fetchCourse(), fetchYear()]);
        setYear(b);
        setCourse(a);

        if (user) {
          form.reset({
            gender: user?.gender || '',
            country: user?.country || '',
            displayName: user?.displayName || '',
            email: user?.email || '',
            courseId: user.courseId,
            yearId: user.yearId,
          });
        }
      } catch (error) {
        console.log(error);

        return toast({
          variant: 'destructive',
          title: 'an error occured.',
          description: '',
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
    })();
  }, []);

  async function onSubmit(data: AccountFormValues) {
    try {
      setIsSubmitting(true);
      const prepareUserData: Partial<UserProfile> = {
        gender: data?.gender,
        country: data?.country,
        displayName: data?.displayName,
        courseId: data?.courseId,
        yearId: data.yearId,
      };

      let a = await userService.findOne('email', user?.email!);

      console.log({ a });
      const response = await userService.update(
        user?.uid,
        Object.fromEntries(
          Object.entries(prepareUserData).filter(
            ([_, value]) => value !== undefined,
          ),
        ),
      );

      console.log({ response });
      setIsSubmitting(false);
    } catch (error: any) {
      console.log(new Error(error));
      setIsSubmitting(false);
      toast({
        variant: 'destructive',
        title: 'an error occured.',
        description: '',
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
        <>
          {/* {!appLoading ? ( */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)} // Corrected form submission handling
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="displayName">DisplayName</FormLabel>
                    <FormControl>
                      <Input id="displayName" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" readOnly {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormControl>
                      <Input id="country" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="course">Course</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={'Select a course'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Course</SelectLabel>
                              {course.length > 0 ? (
                                course.map((i, index) => {
                                  return (
                                    <SelectItem key={index} value={i?.id!}>
                                      {i?.name!}
                                    </SelectItem>
                                  );
                                })
                              ) : (
                                <SelectItem value="no record available">
                                  No Course available
                                </SelectItem>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="yearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="year">Year</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={'Select a year'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Year</SelectLabel>
                            {year.length > 0 ? (
                              year.map((i, index) => {
                                return (
                                  <SelectItem key={index} value={i?.id!}>
                                    {i?.name!}
                                  </SelectItem>
                                );
                              })
                            ) : (
                              <SelectItem value="no record available">
                                No Course available
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                Update account
                {isSubmitting && (
                  <Loader className="animate-spin  dark:text-black" />
                )}
              </Button>
            </form>
          </Form>
          {/* ) : (
            <Loader2 className="animate-spin  dark:text-white text-dark" />
          )} */}
        </>
      </div>
    </SettingsLayout>
  );
}
