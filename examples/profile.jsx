import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <main className="flex flex-col items-center p-4">
      <div className="flex items-center gap-3 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>UP</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5 text-xs">
          <div className="font-medium text-2xl">Username</div>
          <div className="text-primary-500 dark:text-primary-400">
            Joined in 2021
          </div>
        </div>
      </div>
      <Tabs defaultValue="profile" className="w-full max-w-2xl">
        <TabsList className="flex justify-center gap-4 mb-6">
          <TabsTrigger value="profile">Información personal</TabsTrigger>
          <TabsTrigger value="billing">Variables genero</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="User Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue="user@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" defaultValue="+1 234 567 890" type="tel" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Update Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input
                  id="card"
                  defaultValue="**** **** **** 1234"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" defaultValue="12/23" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" defaultValue="***" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Update Billing</Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>12/10/2021</TableCell>
                    <TableCell>$100.00</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Paid</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11/10/2021</TableCell>
                    <TableCell>$80.00</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 text-white">
                        Pending
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
