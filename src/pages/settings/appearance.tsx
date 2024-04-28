import { Separator } from '../../components/ui/separator';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '../../components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { cn } from '../../lib/utils';
import { Button, buttonVariants } from '../../components/ui/button';
import SettingsLayout from '../../components/layout/settings/setting-layout';
import { RadioGroupItem, RadioGroup } from '../../components/ui/radio-group';
import { useTheme } from '../../components/layout/ThemeToggle/theme-provider';

export default function SettingsAppearancePage() {
  const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark', 'system'], {
      required_error: 'Please select a theme.',
    }),
  });

  const { toast } = useToast();
  const { setTheme, theme } = useTheme();

  type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme as any,
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  const handleThemeChange = (value: any) => {
    setTheme(value);
    form.setValue('theme', value); // Update form value
  };
  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Theme</FormLabel>
                    <FormDescription>
                      Select the theme for the dashboard.
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={handleThemeChange} // Call handleThemeChange directly
                      defaultValue={field.value}
                      className="grid max-w-md grid-cols-2 gap-8 pt-2"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="light" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Light
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="dark" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Dark
                          </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />

              {/* <Button type="submit">Update preferences</Button> */}
            </form>
          </Form>
        </>
      </div>
    </SettingsLayout>
  );
}
