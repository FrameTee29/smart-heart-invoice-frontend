import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/Layout/MainLayout";
import PermissionLayout from "@/components/Layout/PermissionLayout";
import customerService from "@/services/customer.service";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from "next/router";

interface CreateCustomerForm {
  name: string;
  email: string;
  organization: string;
  phoneNumber: string;
  walletAddress: string;
  address: string;
}

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  organization: z.string().min(1, { message: "Organization name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone No. is required" }),
  walletAddress: z.string().min(1, { message: "Wallet Address is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});

const CreateCustomerPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<CreateCustomerForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: CreateCustomerForm) => {
    try {
      await customerService.createCustomer(values);
      await toast({
        variant: "success",
        title: "Create customer",
        description: "Successfully created customer",
        duration: 2000,
      });
      router.push("/admin");
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast({
          variant: "destructive",
          description: err?.response?.data?.message,
          duration: 2000,
        });
      }
    }
  };

  return (
    <MainLayout>
      <PermissionLayout>
        <Container>
          <div>
            <p className="text-4xl font-bold">Create Customer</p>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-12 max-w-xl"
              >
                <div>
                  <label className="font-medium">Name</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("name")}
                  />
                  <p className="text-red-500 text-xs">{errors.name?.message}</p>
                </div>

                <div>
                  <label className="font-medium">Email</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("email")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.email?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Organization</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("organization")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.organization?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Phone Number</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("phoneNumber")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Wallet Address</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("walletAddress")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.walletAddress?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Address</label>
                  <Input
                    disabled={isLoading || isSubmitting}
                    className="text-gray-500"
                    {...register("address")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.address?.message}
                  </p>
                </div>

                <Button
                  aria-label="Go to previous page"
                  variant="outline"
                  className="px-7 bg-primary text-background h-10"
                  type="submit"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? "Creating..." : "Create"}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </PermissionLayout>
    </MainLayout>
  );
};

export default CreateCustomerPage;
