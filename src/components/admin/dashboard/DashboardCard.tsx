import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Image,
} from "@heroui/react";

const Dashboard = () => {
  const stats = {
    totalMenus: 24,
    overview: "ใยรักคาเฟ่ - บริการด้วยใจ เมนูหลากหลาย",
    totalEmployees: 5,
  };

  const handleManageMenus = () => {
    console.log("จัดการเมนู");
  };

  const handleManageEmployees = () => {
    console.log("จัดการพนักงาน");
  };

  return (
    <Card className="py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default Dashboard;
