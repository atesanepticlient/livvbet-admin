// components/agent/DepositForm.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDepositToWalletMutation } from "@/lib/features/agentApiSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid number with up to 2 decimal places",
    }),
  currencyCode: z.string().min(1, "Currency code is required"),
  reference: z.string().optional(),
});

export const DepositForm = ({
  selectedAgent,
  onSuccess,
}: {
  selectedAgent: any;
  onSuccess?: () => void;
}) => {
  const [deposit, { isLoading }] = useDepositToWalletMutation();

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      currencyCode: selectedAgent?.agent?.currencyCode || "USD",
      reference: "",
    },
  });

  useEffect(() => {
    if (selectedAgent?.agent?.currencyCode) {
      form.setValue("currencyCode", selectedAgent.agent.currencyCode);
    }
  }, [selectedAgent, form]);

  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    try {
      await deposit({
        agentId: selectedAgent.id,
        amount: parseFloat(values.amount),
        currencyCode: values.currencyCode,
        reference: values.reference,
      }).unwrap();

      toast.success("Deposit successful");

      if (onSuccess) onSuccess();
    } catch  {
      toast.error("There was an error processing the deposit");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currencyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Deposit reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Deposit Funds"}
        </Button>
      </form>
    </Form>
  );
};
