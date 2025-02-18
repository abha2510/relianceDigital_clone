import {
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import mycs from "./prod.module.css";
import { useParams } from "react-router";
import axios from "axios";
import { addItemCart } from "../../Redux/cart/cart.action";
import { useDispatch } from "react-redux";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";

const SingleProduct = () => {
  const [data, setData] = useState([]);
  const { name, id } = useParams();

  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddtoCart = async () => { 
    let fet = await fetch(`https://digital-express.vercel.app/cart`); 
    let cart =await fet.json() 
    let doesincludes = false;
    for(let i=0;i<cart.length;i++){   
        // console.log(cart[i]);    
        // console.log(data.name);  
        if(cart[i].name===data.name){
            doesincludes = true; 
        } 
    }
    if(doesincludes===true){
        toast({
            position: "bottom-center",
            duration: 1200,
            render: () => (
              <Flex
                color="white"
                borderRadius={"10px"}
                p={"10px"}
                bgColor="red.500"
              >
                <SmallCloseIcon w={8} h={8} />
                <Text size="lg" ml="15px">
                  Product is already added in card!
                </Text>
              </Flex>
            ),
          });
    }
    else{
        dispatch(addItemCart(data)); 
        toast({
          position: "bottom-center",
          duration: 1200,
          render: () => (
            <Flex
              color="white"
              borderRadius={"10px"}
              p={"10px"}
              bgColor="green.400"
            >
              <CheckCircleIcon w={30} h={30} />
              <Text size="lg" ml="15px">
                You Successfully Added Product in Cart. Please Check Your Cart!
              </Text>
            </Flex>
          ),
        });
    }
    
  };

  useEffect(() => {
    axios
      .get(`https://digital-express.vercel.app/allproduct/${id}`)
      .then((e) => setData(e.data));
  }, [name, id]);

  return (
    <>
      <Box className={mycs.main} mt={12} mb={12}>
        <Box className={mycs.box1}>
          <Image src={data.img} alt="Product-image" p={12} />
        </Box>
        <Box className={mycs.box2}>
          <Box className={mycs.name}>
            <Heading as="h5" className={mycs.heading} size="lg">
              {data.name}
            </Heading>
          </Box>
          <Box className={mycs.infobox} p={4}>
            <Box className={mycs.info1}>
              <Heading
                as="h5"
                fontSize="lg"
                textAlign={"left"}
                fontWeight="700"
              >
                Key Features
              </Heading>
              <UnorderedList color="#3a3a3a" fontSize="md">
                <ListItem> Definitive Quality </ListItem>
                <ListItem> High-Definition Clarity </ListItem>
                <ListItem> Transmits Original Colours </ListItem>
                <ListItem> Clear Touch' Easy Clean </ListItem>
              </UnorderedList>
              <Heading
                as="h5"
                fontSize={{ base: "sm", lg: "md" }}
                textAlign={"left"}
                fontWeight="700"
              >
                Return Policy
              </Heading>
              <UnorderedList color="#3a3a3a" fontSize="md">
                <ListItem>
                  {" "}
                  Items are eligible for return within 7 Days of Delivery.{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  All accessories, product & packaging need to be returned in
                  original condition.{" "}
                </ListItem>
              </UnorderedList>
              <Heading as="h5" size="sm" textAlign={"left"} fontWeight="500">
                Got Feedback to share on this page?
              </Heading>
            </Box>
            <Box className={mycs.info2}>
              <Heading
                size={{ base: "md", lg: "lg" }}
                textAlign={"left"}
                fontWeight="500"
              >
                ₹{data.price}
              </Heading>
              <Text
                size="xs"
                textAlign={"left"}
                fontWeight="500"
                className={mycs.mrp}
              >
                MRP: {data.mrp}{" "}
                <span className={mycs.inc}> (Inclusive of all taxes) </span>
              </Text>
              <Text
                size="xs"
                textAlign={"left"}
                fontWeight="500"
                className={mycs.discount}
              >
                You Save: {data.discount}
              </Text>
              <Heading as="h3" size={{ base: "xs", lg: "sm" }}>
                FREE Shipping!
              </Heading>
              <Text className={mycs.lines}>
                {" "}
                *Delivery assurance is subject to our delivery locations staying
                open as per govt. regulations{" "}
              </Text>
              <div gap="10px" className={mycs.butbox}>
                <button
                  data-cy="product-add-item-to-cart-button"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
                <button> BUY NOW </button>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleProduct;
