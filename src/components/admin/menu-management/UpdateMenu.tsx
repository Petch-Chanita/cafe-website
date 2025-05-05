import { useEffect, useMemo, useRef, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Image,
  Form,
  SelectItem,
  Select,
  addToast,
  Spinner,
} from "@heroui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  createCategory,
  getCategory,
  getProductById,
  updateProduct,
} from "../../../service/productService";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../../utils/Type";
import { PlusIcon } from "../../../assets/svg/PlusIcon";

const categoryStatusOptions = [
  { key: "available", name: "Available" },
  { key: "unavailable", name: "Unavailable" },
  { key: "seasonal", name: "Seasonal" },
  { key: "disabled", name: "Disabled" },
];

export default function UpdateMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("admin_token");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [checkStatus, setCheckStatus] = useState<boolean>(false);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  let decoded: DecodedToken | null = null;
  if (token) {
    decoded = jwtDecode(token);
  }

  const defaultForm = {
    cafe_id: decoded?.cafe_id,
    name: "",
    price: "",
    image: "",
    category_id: "",
    status: "",
    description: "",
    image_file: "",
    image_url: "",
  };
  const [form, setForm] = useState(defaultForm);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      setForm((prev:any) => ({
        ...prev,
        image_file: file,
        image_url: url,
      }));
    }
  };

  const handleClickBox = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setCheckStatus(true);
    try {
      console.log("Submitting:", form);
      if (!id) return;
        await updateProduct(id, form);
      setCheckStatus(false);
    } catch (error) {
      setCheckStatus(false);

      console.error("Error creating product:", error);
    }
  };

  const classNames = useMemo(
    () => ({
      label: "mb-5 ",
      inputWrapper: "theme dark:!bg-[#243142] focus:!bg-[#1f2937]",
      innerWrapper: " mt-2  ",
      mainWrapper: "theme ",
      input: "theme text-md",
    }),
    []
  );

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await getProductById(id);
      setForm((prev:any) => ({
        ...prev,
        cafe_id: res.cafe_id,
        name: res.name || "",
        price: res.price || "",
        image: res.image || "",
        category_id: res.category_id || "",
        status: res.status || "",
        description: res.description || "",
        image_url: res.image_url || "",
        image_file: null,
      }));
      setPreviewUrl(res.image_url);
      console.log("resProduct", res);
    } catch (error) {
      console.error("Error fetching product", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    const resCategory = await getCategory();
    setCategory(resCategory);
  };

  useEffect(() => {
    if (!id) return;

    fetchProduct(id);
    fetchCategory();
  }, [id]);

  useEffect(() => {
    console.log("Category", category);
  }, [category]);

  const handleAddItem = async () => {
    const newItem = query || `New item`;

    if (!category.includes(newItem)) {
      const newCategory = {
        cafe_id: decoded?.cafe_id,
        name: newItem.trim(),
      };

      await createCategory(newCategory);
      await fetchCategory();
    }

    setQuery("");
  };

  return (
    <div className="p-5 theme rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-5">
        <h2 className="font-semibold mb-6">Update Menu</h2>
      </div>

      <div className="h-[500px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center h-full">
            <Spinner classNames={{ label: "text-foreground mt-4" }} />
          </div>
        ) : (
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

              <div className="mb-2 flex flex-col items-center gap-2">
                <Select
                  isRequired
                  name="Type"
                  label="Type"
                  placeholder="e.g. Drinks"
                  selectedKeys={[form.category_id]}
                  onChange={(e) => handleChange("category_id", e.target.value)}
                  classNames={classNames}
                  size="md"
                >
                  {category?.map((item: any) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
                <div className="mb-2 flex items-center gap-2">
                  <Input
                    size="md"
                    placeholder="Add new category"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    // classNames={classNames}
                  />
                  <Button size="md" variant="flat" onClick={handleAddItem}>
                    <PlusIcon className="w-40 h-40" />
                    Add
                  </Button>
                </div>
              </div>

              <Select
                isRequired
                name="status"
                label="Status"
                placeholder="e.g. Available"
                selectedKeys={[form.status]}
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                classNames={classNames}
                size="md"
              >
                {categoryStatusOptions.map((status) => (
                  <SelectItem key={status.key}>{status.name}</SelectItem>
                ))}
              </Select>

              <Textarea
                label="Description"
                placeholder="Optional description..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                classNames={classNames}
              />
            </div>
          </Form>
        )}
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
          // onClick={handleSubmit}
          onPress={async () => {
            try {
              await handleSubmit();
              addToast({
                title: "Success",
                description: "Insert new menu successfully",
                color: "success",
              });
            } catch (err) {
              addToast({
                title: "Error",
                description: "Insert new menu failed",
                color: "danger",
              });
            }
          }}
          disabled={checkStatus}
        >
          {checkStatus ? <Spinner color="white" /> : "Update Menu"}
        </Button>
      </div>
    </div>
  );
}
