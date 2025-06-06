import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Select,
  Selection,
  SelectItem,
  Spinner,
  Chip,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";

import {
  initialProductState,
  productReducer,
} from "../../../contexts/productReducer";
import { deleteProduct, getProduct } from "../../../service/productService";
import { useCafe } from "../../../contexts/CafeContext";
import "./MenuManaement.css";
import { VerticalDotsIcon } from "../../../assets/svg/VerticalDotsIcon";
import { SearchIcon } from "../../../assets/svg/SearchIcon";
import { ChevronDownIcon } from "../../../assets/svg/ChevronDownIcon";
import { PlusIcon } from "../../../assets/svg/PlusIcon";
import { DeleteIcon } from "../../../assets/svg/DeleteIcon";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRICE", uid: "price" },
  { name: "STATUS", uid: "status" },
  { name: "TYPE", uid: "type" },
  { name: "ACTIONS", uid: "actions" },
];

function capitalize(s: any) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap: any = {
  available: "success",
  unavailable: "warning",
  disabled: "default",
  seasonal: "primary",
};

const MenuManagement = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useCafe();
  const [, dispatch] = useReducer(productReducer, initialProductState);

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [itemToDelete, setItemToDelete] = useState<any>();
  const isSelectionEmpty =
    selectedKeys === "all" ? false : selectedKeys.size === 0;

  const cafe_id = import.meta.env.VITE_APP_CAFE_ID;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteMode, setDeleteMode] = useState<"single" | "multiple">(
    "multiple"
  );

  const renderCell = useCallback((item: any, columnKey: any) => {
    console.log(item);
    console.log(columnKey);

    const cellValue = item[columnKey];

    switch (columnKey) {
      case "name":
        return (
          // <User
          // avatarProps={{ radius: "full", src: item.image_url }}
          // description={item.name}
          // name={cellValue}
          // >
          <p>{item.name}</p>
          //  </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {/* {item.team} */}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "type":
        return (
          <div>
            <p className="capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-5">
            <Dropdown className="bg-background border-1 border-default-200 theme">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="theme">
                <DropdownItem
                  key="edit"
                  onClick={() => handleUpdateMenu(item.id)}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-red-600 hover:!text-red-600"
                  onClick={() => {
                    setDeleteMode("single");
                    setItemToDelete(item);
                    onOpen();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const fetchProducts = async () => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });

    try {
      const productData = await getProduct();
      console.log("Fetched product data:", productData);
      if (!Array.isArray(productData)) {
        throw new Error("Product data is not an array!");
      }

      setProducts(productData);
      dispatch({
        type: "FETCH_PRODUCTS_SUCCESS",
        payload: productData,
      });
    } catch (error: any) {
      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        payload: error.message,
      });
      addToast({
        title: "Error",
        description: "get product failed",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log("menutDatammmmmmm", products);
    console.log("cafe_id", cafe_id);
  }, []);

  const memoizedProducts = useMemo(() => {
    const filteredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filteredProducts;
  }, [products, filterValue]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      console.log("value", value);

      if (!value) return;

      setRowsPerPage(Number(value));
      setPage(1);
    },
    [rowsPerPage]
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const handleDeleteSelected = async () => {
    console.log("handleDeleteSelected", selectedKeys);

    try {
      const idsToDelete: any = Array.from(selectedKeys);
      console.log("idsToDelete", idsToDelete);
      await deleteProduct(idsToDelete);
      addToast({
        title: "Success",
        description: "Delete menu successfully",
        color: "success",
      });
      const updatedProducts = memoizedProducts.filter(
        (item: any) => !idsToDelete.includes(item.id)
      );
      setProducts(updatedProducts);
      setSelectedKeys(new Set());

      onClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Delete menu error",
        color: "danger",
      });
      onClose();
    }
  };

  const handleDelete = async (item_: any) => {
    console.log("handleDelete", item_.id);
    try {
      await deleteProduct([item_.id]);
      addToast({
        title: "Success",
        description: "Delete menu successfully",
        color: "success",
      });

      const updatedProducts = memoizedProducts.filter(
        (item: any) => item.id !== item_.id
      );
      setProducts(updatedProducts);

      setItemToDelete("");
      onClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Delete menu failed",
        color: "danger",
      });
      onClose();
    }
  };

  const handleAddNew = () => {
    navigate("/admin-dashboard/add-new-menu");
  };

  const handleUpdateMenu = (id: string) => {
    navigate(`/admin-dashboard/update-menu/${id}`);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex justify-between gap-5 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "py-5",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-gray-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 theme">
            <Dropdown className="theme">
              <DropdownTrigger className="hidden sm:flex theme">
                <Button
                  className="py-5 !bg-gray-200 dark:!bg-[#374961]"
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="md"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                // selectedKeys={visibleColumns}
                selectionMode="multiple"
                // onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white dark:from-blue-600 dark:to-teal-500 shadow-md rounded-xl py-5"
              endContent={<PlusIcon />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-5">
            <span className="text-small">Total {products.length} Menu</span>

            <div className="flex items-center">
              <Button
                onClick={onOpen}
                disabled={isSelectionEmpty}
                className={`items-center gap-2 rounded-xl font-semibold text-center transition disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2
                  ${
                    isSelectionEmpty
                      ? "bg-gray-300 text-gray-500"
                      : "bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md"
                  }
                `}
                size="md"
              >
                Delete <DeleteIcon />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-10">
            <span className="text-small whitespace-nowrap min-w-[100px]">
              Rows per page:
            </span>
            <Select
              className="min-w-[80px]"
              value={rowsPerPage.toString()}
              selectedKeys={[rowsPerPage.toString()]}
              onChange={onRowsPerPageChange}
              selectionMode="single"
              classNames={{
                trigger: "dark:!bg-[#374961]",
                popoverContent: "theme",
                listbox: "p-1",
                base: "text-sm",
              }}
            >
              <SelectItem key="5" textValue="5">
                5
              </SelectItem>
              <SelectItem key="10" textValue="10">
                10
              </SelectItem>
              <SelectItem key="15" textValue="15">
                15
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    // statusFilter,
    // visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
    hasSearchFilter,
    selectedKeys,
    isSelectionEmpty,
  ]);

  const loadingState = products?.length === 0 ? "loading" : "idle";
  return (
    <div className="p-5 rounded-2xl theme shadow-2xl h-full theme">
      <Table
        isCompact
        // removeWrapper
        color={"default"}
        aria-label="Example table with custom cells"
        selectionMode="multiple"
        topContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "dark:after:bg-[#6482aa] after:bg-[#b8c8ff]",
            icon: "text-white ",
          },
        }}
        classNames={{
          // base: "theme ",
          table: " rounded-xl min-w-full",
          th: "sticky top-0 z-10 dark:bg-[#374961] bg-[#c7deff] font-semibold text-sm p-4 ",
          td: "text-sm p-4 transition-colors duration-200",
          tr: "transition-all duration-300",
          // thead: "rounded-t-lg ",
          tbody: "divide-y divide-gray-100",
          wrapper: "max-h-[400px] overflow-y-auto theme",
        }}
        topContent={topContent}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="text-gray-400 dark:text-gray-500 py-10 italic animate-pulse">
              No Menu found
            </div>
          }
          items={memoizedProducts ?? []}
          loadingContent={
            <div className="pt-50 ">
              <Spinner className="text-blue-600" />
            </div>
          }
          loadingState={loadingState}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmModal
        isOpen={isOpen}
        onOk={() => {
          if (deleteMode === "single" && itemToDelete) {
            handleDelete(itemToDelete);
          } else {
            handleDeleteSelected();
          }
        }}
        onCancel={onClose}
      />
    </div>
  );
};

export default MenuManagement;
