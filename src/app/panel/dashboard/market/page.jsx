"use client";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import {
  updateProduct,
  getProductCategories,
  getCategoryProducts,
  deleteHomeProductById,
  addHomeProduct,
  addProductCategory,
} from "../../../api/v1/dashboard";
import Swal from "sweetalert2";
import storage from "../../../api/v1/firebase";
import {
  ref,
  uploadBytes,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { TiDelete } from "react-icons/ti";
import { uploadProductImages } from "../../../../lib/images";
function page() {
  const [shopOpen, setShopOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategoriesOfCreatedProducts] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [openProducts, setOpenProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [editedProductprice, setEditedProductPrice] = useState(0);
  const [productImage, setProductImage] = useState({});

  const [inEditingProduct, setInEditingProduct] = useState();
  const [edited2, setEdited2] = useState(false);

  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMarka, setProductMarka] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categoreies, setCategories] = useState([]);
  const [newcategorTitle, setNewCategoryTitle] = useState("");
  const [allProductCategories, setAllProductCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [userEditedAField, setUserEditedAField] = useState(false);

  //
  async function createProductCategory(name) {
    await addProductCategory(name);
  }
  //

  async function getProductImageUrls(id) {
    const storageRef = ref(storage, `images/products/${id}/`);

    const result = await listAll(storageRef);

    let urls = [];

    for (let item of result.items) {
      urls.push({ url: await getDownloadURL(item), obj: item });
    }

    return urls;
  }

  useEffect(() => {
    getCategoryProducts().then(async (cp) => {
      if (cp === "error") {
        console.log("There is an error with getting the data !");
      } else {
        for (let category of cp) {
          for (let prod of category.data) {
            prod.images = await getProductImageUrls(prod.id);
          }
        }
        setProducts(cp);
      }
    });

    getProductCategories().then((c) => {
      if (c === "error") {
      } else {
        setCategoriesOfCreatedProducts(c);
        console.log(c);
      }
    });
  }, [products]);

  useEffect(() => {
    getProductCategories().then((c) => {
      if (c === "error") {
        console.log("error");
      } else {
        setAllProductCategories(c?.map((ele) => ele.name));
        console.log(allProductCategories);
        setCategories(c?.map((cat) => cat.name));
      }
    });
  }, []);

  const handelEditProduct = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateProduct(result.id, {
          name: editedProductName,
          description: editedProductDescription,
          price: editedProductprice,
        });

        await Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        await Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <p className="font-bold text-3xl ml-10 mt-3">Market</p>
      <div id="shop" className="add-product-to-shop mt-4 border-t-2 ">
        <div
          className={`create-plan  w-[97%] mx-4 mt-4 shadow-lg overflow-hidden rounded-[30px] duration-700 flex flex-col ${
            shopOpen ? "h-[650px]" : "h-[55px]"
          }`}
        >
          <div
            onClick={() => setShopOpen(!shopOpen)}
            className="header flex justify-between items-center mt-4 px-2 cursor-pointer relative"
          >
            <p className=" text-[19px] text-center font-bold w-full mb-10">
              Add product
            </p>
            {shopOpen ? (
              <CiSaveUp1 className="absolute right-2 top-[5px]" size={24} />
            ) : (
              <CiSaveDown1 className="absolute right-2 top-[5px]" size={24} />
            )}
          </div>
          <div className="form-content w-full mr-10 rounded-[30px] py-1 px-5 flex gap-5">
            <div className="flex flex-col gap-5 w-[100%] border-r-2 pr-10 ">
              <div className="product-images flex flex-col">
                <label htmlFor="product-images">Product images</label>
                <input
                  className="border-2 rounded-2xl"
                  type="file"
                  multiple
                  name=""
                  id="product-images"
                  onChange={(e) => {
                    setEdited2(true);
                    setProductImage(e.target.files ?? new FileList());
                  }}
                />
              </div>{" "}
              <div className="product-name flex flex-col">
                <label htmlFor="product-name">Product name</label>
                <input
                  className="border-2 rounded-2xl px-2"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  type="text"
                  placeholder="Product name"
                  id="product-name"
                />
              </div>{" "}
              <div className="product-desc flex flex-col">
                <label htmlFor="product-description">Product Description</label>
                <input
                  className="border-2 rounded-2xl px-2"
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  type="text"
                  placeholder="Product description"
                  id="product-description"
                />
              </div>{" "}
              <div className="product-price flex flex-col">
                <label htmlFor="product-price">Product price</label>
                <input
                  className="border-2 rounded-2xl px-2"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  type="text"
                  placeholder="Product price"
                  id="product-price"
                />
              </div>{" "}
              <div className="product-company flex flex-col">
                <label htmlFor="product-company">Product marka</label>
                <input
                  className="border-2 rounded-2xl px-2"
                  value={productMarka}
                  onChange={(e) => setProductMarka(e.target.value)}
                  type="text"
                  placeholder="Product company"
                  id="product-company"
                />
              </div>
              <div className="product-category flex flex-col">
                <label htmlFor="product-company">Product category</label>
                <select
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  className="select px-2 py-2 border-2 rounded-[31px] outline-none"
                >
                  <option selected value="select">
                    Select
                  </option>
                  {categories?.map((c) => (
                    <option>{c.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: `Do you want to save the Product?
                      You will be able to edit the product from Products page.
                      `,
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      const addResult = await addHomeProduct({
                        name: productTitle,
                        description: productDesc,
                        price: productPrice,
                        marka: productMarka,
                        category: productCategory,
                      });

                      if (
                        productImage &&
                        productImage.length &&
                        typeof addResult === "number"
                      ) {
                        const result = await uploadProductImages(
                          addResult,
                          productImage
                        );

                        if (result) {
                          Swal.fire("Failed to upload images", "", "error");
                        } else {
                          Swal.fire("Saved!", "", "success");
                        }
                        setProductDesc("");
                        setProductMarka("");
                        setProductPrice("");
                        setProductTitle("");
                        setProductCategory("");
                        setProductImage({ length: 0 });
                        setEdited2(false);
                      }
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                }}
                className="bg-green-700 h-[40px] text-white font-bold rounded-xl"
              >
                Create
              </button>
            </div>
            <div className="create-cat w-full">
              <p className="text-xl font-bold pb-2">Create Category</p>
              <div className="add-cat flex justify-between w-[100%] items-center">
                <div className="flex flex-col w-[76%]">
                  <label htmlFor="product-name">Category name</label>
                  <input
                    className="border-2 rounded-2xl px-2"
                    value={newcategorTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    type="text"
                    placeholder="Category name"
                    id="product-name"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newcategorTitle !== "") {
                      setCategories([...categoreies, newcategorTitle]);
                      console.log(categoreies);
                      setNewCategoryTitle("");
                    }
                  }}
                  className="w-[20%] h-[36px] mt-5"
                >
                  Create
                </button>
              </div>
              <div className="already-added-categories mt-7 w-full h-[200px] border-2 p-5 rounded-[21px] overflow-y-auto ">
                <div className="flex flex-wrap w-full gap-5 ">
                  {categoreies?.map((ele) => {
                    return (
                      <>
                        <div className="relative">
                          <p className="bg-gray-100 rounded-full px-2">{ele}</p>
                          <p
                            onClick={() => {
                              const filtetdArray = categoreies.filter(
                                (e) => e != ele
                              );
                              setCategories(filtetdArray);
                              setDeletedCategories([...deletedCategories, ele]);
                            }}
                            className="text-sm absolute -top-3 -right-4 bg-gray-100 cursor-pointer hover:bg-red-600 duration-300 hover:text-white w-[30px] flex items-center justify-center rounded-full"
                          >
                            x
                          </p>
                        </div>
                      </>
                    );
                  })}{" "}
                </div>
              </div>
              <div
                style={
                  deletedCategories.length > 0
                    ? { opacity: 1, height: "200px" }
                    : { opacity: 0, height: "0px" }
                }
                className="already-added-categories duration-300 mt-7 w-full  border-2 p-5 rounded-[21px] overflow-y-auto "
              >
                <p className=" text-center font-extrabold mb-3">
                  Deleted Categories
                </p>
                <div className=" flex flex-wrap w-full gap-5 ">
                  {deletedCategories
                    ?.filter((ele) => allProductCategories.includes(ele))
                    .map((ele) => {
                      return (
                        <>
                          <div className="w-full flex">
                            <div>
                              {ele} {`=>`}
                            </div>
                            <select className=" outline-none  border-2 px-2 ml-2 rounded-xl border-green-200">
                              <option selected value="1">
                                delete all products related
                              </option>
                              {allProductCategories
                                .filter((e) => e != ele)
                                .map((ele) => {
                                  return (
                                    <>
                                      <option value={ele}>
                                        Add All products related to {ele}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg h-full m-3 p-4 rounded-lg">
        {/* Start add Product blog */}

        <div className=" items-center ">
          <div className="self-center ml-10 relative">
            <CiSearch size={25} className=" absolute left-1 " />
            <input
              onChange={(e) => setFilterValue(e.target.value)}
              className="border-2 rounded-xl px-7 w-[100%]"
              type="text"
              placeholder="Search product by name"
            />
          </div>
        </div>
        <div className="prodcuts w-full  flex justify-between px-20 mt-6">
          <div className={`categories  font-bold rounded-lg `}>
            <p
              onClick={() => {
                activeSection === null ? null : setActiveSection(null);
              }}
              className={`font-bold cursor-pointer ${
                activeSection !== null
                  ? "bg-gray-300 text-black"
                  : "bg-green-700 text-white"
              }  px-6 py-1   rounded-lg `}
            >
              All Products
            </p>
          </div>
          {products?.map((ele, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  onClick={() => {
                    setActiveSection(ele.id);
                  }}
                  className={`categories ${
                    activeSection === ele.id
                      ? "bg-green-700 text-white"
                      : "bg-gray-300 text-black"
                  }  px-6 py-1  font-bold rounded-lg `}
                >
                  <p className="font-bold cursor-pointer">{ele.cat}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {products?.map((ele) => {
          return (
            <>
              {activeSection !== null
                ? ele.data
                    ?.filter((ele) =>
                      ele.name
                        .trim()
                        .toLowerCase()
                        .includes(filterValue.trim().toLowerCase())
                    )
                    .filter((e) => e.categoryId === activeSection)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((el, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`shadow-lg px-2 py-2 rounded-lg mt-4 duration-300 overflow-hidden ${
                              openProducts.includes(el.id)
                                ? "h-[670px]"
                                : "h-[45px]"
                            }`}
                          >
                            <div
                              onClick={() => {
                                if (openProducts.includes(el.id)) {
                                  setOpenProducts(
                                    openProducts.filter((id) => id !== el.id)
                                  );
                                } else {
                                  setOpenProducts([...openProducts, el.id]);
                                }
                                console.log(el.id);
                              }}
                              className="flex justify-between items-center h-[45px]"
                            >
                              <p className="font-bold">{el.name}</p>
                              {openProducts.includes(el.id) ? (
                                <CiSaveUp1 size={24} />
                              ) : (
                                <CiSaveDown1 size={24} />
                              )}
                            </div>
                            <div className="content mt-4">
                              <div className="product-images flex justify-evenly items-center mb-5 relative">
                                {/* Product Images */}
                                {el.images?.map((i) => (
                                  <div className="shadow-lg rounded-lg  p-2 relative">
                                    <img
                                      className="w-[250px] rounded-xl"
                                      src={i.url}
                                      alt=""
                                    />{" "}
                                    {inEditingProduct === el.id && (
                                      <span className="cursor-pointer absolute -top-2 -right-2">
                                        <TiDelete
                                          onClick={() => {
                                            deleteObject(
                                              ref(
                                                storage,
                                                `images/products/${el.id}/${i.obj.name}`
                                              )
                                            );
                                          }}
                                          size={25}
                                          color="red"
                                        />
                                      </span>
                                    )}
                                  </div>
                                ))}

                                <div className="flex items-center absolute top-0 right-0 gap-4">
                                  {inEditingProduct === el.id ? (
                                    <MdOutlineCancel
                                      color="green"
                                      size={23}
                                      onClick={() => setInEditingProduct(null)}
                                    />
                                  ) : (
                                    <CiEdit
                                      onClick={() => setInEditingProduct(el.id)}
                                      color="green"
                                      size={23}
                                    />
                                  )}
                                  <MdDeleteForever
                                    onClick={async () => {
                                      Swal.fire({
                                        title:
                                          "Do you want to delete the product?",
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        confirmButtonText: "delete",
                                        denyButtonText: `Don't delete`,
                                      }).then(async (result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                          const deleteRes =
                                            await deleteHomeProductById(el.id);
                                          console.log(
                                            "delete product: " + deleteRes
                                          );
                                          Swal.fire("Deleted!", "", "success");
                                        } else if (result.isDenied) {
                                          Swal.fire(
                                            "Product not deleted",
                                            "",
                                            "info"
                                          );
                                        }
                                      });
                                    }}
                                    color="red"
                                    size={23}
                                  />
                                </div>
                              </div>
                              <div className="flex  items-center ">
                                <div className="mb-5">
                                  {inEditingProduct === el.id ? (
                                    <>
                                      <span className="font-bold">
                                        Marka :{" "}
                                      </span>
                                      <input
                                        className="border-2 px-2 rounded-xl"
                                        type="text"
                                        defaultValue={el.marka}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <span className="font-bold">
                                        Marka :{" "}
                                      </span>{" "}
                                      {el.marka}
                                    </>
                                  )}
                                </div>
                                <div className="mb-5 ml-5">
                                  {inEditingProduct === el.id ? (
                                    <>
                                      <span className="font-bold">Name : </span>
                                      <input
                                        className="border-2 px-2 rounded-xl"
                                        type="text"
                                        defaultValue={el.name}
                                      />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="mb-5">
                                {inEditingProduct === el.id ? (
                                  <>
                                    <span className="font-bold">price : </span>
                                    <input
                                      className="border-2 px-2 rounded-xl"
                                      type="text"
                                      defaultValue={el.price}
                                    />
                                    TL
                                  </>
                                ) : (
                                  <>
                                    <span className="font-bold">Price : </span>{" "}
                                    {el.price} TL
                                  </>
                                )}
                              </div>
                              <div className="">
                                {inEditingProduct === el.id ? (
                                  <>
                                    <div className="flex">
                                      <p className="font-bold">
                                        Description :{" "}
                                      </p>
                                      <textarea
                                        className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                        defaultValue={el.description}
                                      />
                                    </div>
                                    <button
                                      onClick={() => {
                                        Swal.fire({
                                          title:
                                            "Do you want to save the changes?",
                                          showDenyButton: true,
                                          showCancelButton: true,
                                          confirmButtonText: "Save",
                                          denyButtonText: `Don't save`,
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            Swal.fire("Saved!", "", "success");
                                          } else if (result.isDenied) {
                                            Swal.fire(
                                              "Changes are not saved",
                                              "",
                                              "info"
                                            );
                                          }
                                        });
                                      }}
                                      className="bg-green-700 px-2 py-2 rounded-md text-white font-bold mt-3 w-full mx-auto my-0"
                                    >
                                      Submit edits
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex">
                                      <p className="font-bold">
                                        Description :{" "}
                                      </p>
                                      <textarea
                                        disabled
                                        className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                        defaultValue={el.description}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                : ele.data
                    ?.filter((ele) =>
                      ele.name
                        .trim()
                        .toLowerCase()
                        .includes(filterValue.trim().toLowerCase())
                    )
                    .sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((el, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`shadow-lg px-2 py-2 rounded-lg mt-4 duration-300 overflow-hidden ${
                              openProducts.includes(el.id)
                                ? "h-max"
                                : "h-[45px]"
                            }`}
                          >
                            <div
                              onClick={() => {
                                if (openProducts.includes(el.id)) {
                                  setOpenProducts(
                                    openProducts.filter((id) => id !== el.id)
                                  );
                                } else {
                                  setOpenProducts([...openProducts, el.id]);
                                }
                                console.log(el.id);
                              }}
                              className="flex justify-between items-center h-[45px]"
                            >
                              <p className="font-bold">{el.name}</p>
                              {openProducts.includes(el.id) ? (
                                <CiSaveUp1 size={24} />
                              ) : (
                                <CiSaveDown1 size={24} />
                              )}
                            </div>
                            <div className="content mt-4">
                              <div className="product-images flex justify-evenly items-center mb-5 relative">
                                {el.images?.map((i) => (
                                  <div className="shadow-lg rounded-lg  p-2 relative">
                                    <img
                                      className="w-[250px] rounded-xl"
                                      src={i.url}
                                      alt=""
                                    />{" "}
                                    {inEditingProduct === el.id && (
                                      <span className="cursor-pointer absolute -top-2 -right-2">
                                        <TiDelete
                                          onClick={() => {
                                            deleteObject(
                                              ref(
                                                storage,
                                                `images/products/${el.id}/${i.obj.name}`
                                              )
                                            );
                                          }}
                                          size={25}
                                          color="red"
                                        />
                                      </span>
                                    )}
                                  </div>
                                ))}

                                <div className="flex items-center absolute top-0 right-0 gap-4">
                                  {inEditingProduct === el.id ? (
                                    <MdOutlineCancel
                                      color="green"
                                      size={23}
                                      onClick={() => setInEditingProduct(null)}
                                    />
                                  ) : (
                                    <CiEdit
                                      onClick={() => setInEditingProduct(el.id)}
                                      color="green"
                                      size={23}
                                    />
                                  )}
                                  <MdDeleteForever
                                    onClick={async () => {
                                      Swal.fire({
                                        title:
                                          "Do you want to delete the product?",
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        confirmButtonText: "delete",
                                        denyButtonText: `Don't delete`,
                                      }).then(async (result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                          const deleteRes =
                                            await deleteHomeProductById(el.id);
                                          console.log(
                                            "delete product: " + deleteRes
                                          );
                                          Swal.fire("Deleted!", "", "success");
                                        } else if (result.isDenied) {
                                          Swal.fire(
                                            "Product not deleted",
                                            "",
                                            "info"
                                          );
                                        }
                                      });
                                    }}
                                    color="red"
                                    size={23}
                                  />
                                </div>
                              </div>
                              <div className="flex  items-center ">
                                <div className="mb-5">
                                  {inEditingProduct === el.id ? (
                                    <>
                                      <span className="font-bold">Marka :</span>
                                      <input
                                        className="border-2 px-2 rounded-xl"
                                        type="text"
                                        defaultValue={el.marka}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <span className="font-bold">Marka :</span>
                                      {el.marka}
                                    </>
                                  )}
                                </div>
                                <div className="mb-5 ml-5">
                                  {inEditingProduct === el.id && (
                                    <>
                                      <span className="font-bold">Name : </span>
                                      <input
                                        onChange={({ target }) => {
                                          setEditedProductName(target.value);
                                          setUserEditedAField(true);
                                        }}
                                        className="border-2 px-2 rounded-xl"
                                        type="text"
                                        defaultValue={el.name}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="mb-5">
                                {inEditingProduct === el.id ? (
                                  <>
                                    <span className="font-bold">price : </span>
                                    <input
                                      onChange={(e) => {
                                        setEditedProductPrice(
                                          Number(e.target.value)
                                        );
                                        setUserEditedAField(true);
                                      }}
                                      className="border-2 px-2 rounded-xl"
                                      type="text"
                                      defaultValue={el.price}
                                    />
                                    TL
                                  </>
                                ) : (
                                  <>
                                    <span className="font-bold">Price : </span>{" "}
                                    {el.price} TL
                                  </>
                                )}
                              </div>
                              <div className="">
                                {inEditingProduct === el.id ? (
                                  <>
                                    <div className="flex">
                                      <p className="font-bold">
                                        Description :{" "}
                                      </p>
                                      <textarea
                                        onChange={(e) => {
                                          setEditedProductDescription(
                                            e.target.value
                                          );
                                          setUserEditedAField(true);
                                        }}
                                        className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                        defaultValue={el.description}
                                      />
                                    </div>
                                    <button
                                      onClick={handelEditProduct}
                                      className="bg-green-700 px-2 py-2 rounded-md text-white font-bold mt-3 w-full mx-auto my-0"
                                    >
                                      Submit edits
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex">
                                      <p className="font-bold">
                                        Description :{" "}
                                      </p>
                                      <textarea
                                        disabled
                                        className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                        defaultValue={el.description}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
            </>
          );
        })}
      </div>
    </>
  );
}

export default page;
