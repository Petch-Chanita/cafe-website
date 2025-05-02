import { useEffect, useMemo, useRef, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Image,
  Form,
  baseStyles,
  SelectItem,
  Select,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  createCategory,
  createProduct,
  getCategory,
} from "../../../service/productService";
import CreatableSelect from "react-select/creatable";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../../utils/Type";

export default function AddNewProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClickBox = () => {
    fileInputRef.current?.click();
  };

  const [form, setForm] = useState({
    name: "",
    price: "",
    image_url: "",
    category_id: "",
    status: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting:", form);
    // await createProduct(form);
  };

  const classNames = useMemo(
    () => ({
      label: "mb-5 theme dark:!bg-[#243142]",
      inputWrapper: "theme dark:!bg-[#243142] focus:!bg-[#1f2937]",
      innerWrapper: "theme mt-2 dark:!bg-[#243142] ",
      mainWrapper: "theme ",
      input: "theme text-md",
    }),
    []
  );

  const fetchCategory = async () => {
    const resCategory = await getCategory();
    console.log("resCategory", resCategory);

    setCategory(resCategory);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log("Category", category);
  }, [category]);

  const handleCategoryChange = async (newValue: any) => {
    let decoded: DecodedToken | null = null;
    if (token) {
      decoded = jwtDecode(token);
      //   console.log("User ID:", decoded.id);
    }

    if (newValue.__isNew__) {
      if (!decoded) return;

      try {
        const newCategory = {
          cafe_id: decoded.cafe_id,
          name: newValue.label,
        };

        const resNewCategory = await createCategory(newCategory); // รอผลลัพธ์ก่อนใช้
        console.log("New category created:", resNewCategory);

        setCategory((prev: any[]) => [...prev, resNewCategory]);

        setForm((prev) => ({
          ...prev,
          category_id: resNewCategory.id,
        }));
      } catch (error) {
        console.error("Error creating new category:", error);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        category_id: newValue.value,
      }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    let decoded: DecodedToken | null = null;
    if (token) {
      decoded = jwtDecode(token);
      //   console.log("User ID:", decoded.id);
    }

    const newCategory = {
      cafe_id: decoded?.cafe_id,
      name: newCategoryName.trim(),
    };

    const resNewCategory = await createCategory(newCategory);

    // เพิ่มเข้า list และเซ็ตเป็นค่าที่เลือก
    setCategory((prev: any) => [...prev, resNewCategory]);
    handleChange("category_id", resNewCategory.id);
    setNewCategoryName("");
  };

  return (
    <div className="p-5 theme rounded-2xl shadow-2xl overflow-hidden">
      {/* Header และ Padding ด้านบน */}
      <div className="p-5">
        <h2 className="font-semibold mb-6">Add New Menu</h2>
      </div>

      {/* Scrollable area ไม่ใส่ padding ที่ wrapper */}
      <div className="h-[500px] overflow-y-auto">
        <Form className="w-full grid gap-4">
          {/* Image Upload */}
          <div className="w-full mx-auto py-5">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />

            <div
              onClick={handleClickBox}
              className="theme mx-auto w-80 h-80 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition relative overflow-hidden bg-gray-100"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-center">
                  Click to upload image
                </span>
              )}
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
            <Input
              isRequired
              label="Name"
              labelPlacement="inside"
              type="text"
              placeholder="e.g. Coconut Coffee"
              errorMessage="Please enter a valid name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onClear={() => handleChange("name", "")}
              classNames={classNames}
              isClearable
            />

            <Input
              isRequired
              label="Price"
              placeholder="e.g. 80.00"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              onClear={() => handleChange("price", "")}
              classNames={classNames}
              isClearable
            />

            {/* <Select
              isRequired
              name="Type"
              placeholder="Select a category"
              selectedKeys={[form.category_id]}
              onChange={(e) => handleChange("category_id", e.target.value)}
              classNames={{
                trigger: "dark:!bg-[#243142] hover:!bg-[#1f2937]",
                popoverContent: "theme",
                listbox: "p-1",
                base: "text-sm",
              }}
              size="lg"
            >
              <div className="px-2 py-1 border-b border-default-100">
                <Input
                  size="sm"
                  placeholder="Add new category"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
              </div>

              {category?.map((item: any) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              ))}
            </Select> */}

            <Input
              isRequired
              label="Status"
              placeholder="e.g. Available"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              onClear={() => handleChange("status", "")}
              classNames={classNames}
              isClearable
            />

            <Textarea
              label="Description"
              placeholder="Optional description..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              classNames={classNames}
            />
          </div>
        </Form>
      </div>
      {/* Buttons */}
      <div className="flex justify-between p-3">
        <Button
          onClick={() => navigate("/admin-dashboard/menu-management")}
          className="border border-gray-200 bg-white hover:bg-gray-100 text-purple-600 font-semibold rounded-xl px-4 py-2 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Back
        </Button>
        <Button
          color="primary"
          className="rounded-xl font-semibold"
          onClick={handleSubmit}
        >
          Add Menu
        </Button>
      </div>
    </div>
  );
}
