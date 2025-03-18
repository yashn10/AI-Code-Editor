"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Loader2, Sparkles, X, AlertTriangle, Wallet } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import AOS from 'aos';
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants'
import UserContext from '@/context/UserContext';
import WireframecodeContext from '@/context/WireframecodeContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

// Initialize AOS
if (typeof window !== 'undefined') {
    AOS.init({ duration: 800, once: true });
}


const ImageUpload = () => {

    const router = useRouter();
    const [imagePreview, setimagePreview] = useState();
    const [image, setImage] = useState();
    const [selectedAIModel, setSelectedAIModel] = useState();
    const [description, setDescription] = useState("");
    const [generatedCode, setGeneratedCode] = useState(null);
    const [loading, setloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [buttonenabled, setbuttonenabled] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { wireframecode, setWireframecode } = useContext(WireframecodeContext);
    const createWireframeCode = useMutation(api.wireframeToCode.CreateWireframeToCode);


    const onUpload = (e) => {
        const image = e.target.files;

        if (image) {
            const url = URL.createObjectURL(image[0]);
            setimagePreview(url);
            setImage(image[0]);
        }
    }


    const generateCode = async () => {
        if (!image) {
            setErrorMessage("Please upload an image first.");
            setDrawerOpen(true);
            return;
        }

        if (!selectedAIModel) {
            setErrorMessage("Please select an AI model.");
            setDrawerOpen(true);
            return;
        }

        if (!user?._id) {
            setErrorMessage("User authentication required. Please log in.");
            setDrawerOpen(true);
            return;
        }

        if (user?.credits <= 0) {
            setErrorMessage("Not enough credits to generate code. You have used all your credits. please add more credits to continue.");
            setbuttonenabled(true);
            setDrawerOpen(true);
            return;
        }

        try {
            setloading(true);
            setErrorMessage('');

            // Upload image to Cloudinary
            const cloudinaryUrl = await uploadImageToCloudinary(image);
            if (!cloudinaryUrl) {
                setErrorMessage("Failed to upload image to Cloudinary. Please try again.");
                setDrawerOpen(true);
                setloading(false);
                return;
            }

            // Create wireframe record in Convex
            const wireframeId = await createWireframeCode({
                user: user._id,
                imageURL: cloudinaryUrl,
                model: selectedAIModel,
                prompt: description,
            });

            // Log the wireframeId to debug
            console.log("Created wireframe ID:", wireframeId);

            // Validate the wireframeId
            if (!wireframeId) {
                setErrorMessage("Failed to create wireframe record: Invalid ID returned.");
                setDrawerOpen(true);
                setloading(false);
                return;
            }

            // Update context with wireframe data
            setWireframecode({
                _id: wireframeId,
                prompt: description,
                model: selectedAIModel,
                image: cloudinaryUrl,
                Data: null,
            });

            // Redirect to view code page
            router.push(`/view-code/${wireframeId}`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                setErrorMessage(error.response.data.error);
                setDrawerOpen(true);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
                setDrawerOpen(true);
                console.error("Unexpected error:", error);
            }
            setloading(false);
        }
    };


    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        formData.append('file', imageFile);
        if (upload_preset) {
            formData.append('upload_preset', upload_preset); // Replace with your Cloudinary upload preset
        } else {
            throw new Error("Cloudinary cloud name is not defined.");
        }
        if (cloud_name) {
            formData.append('cloud_name', cloud_name); // Replace with your Cloudinary cloud name
        } else {
            throw new Error("Cloudinary cloud name is not defined.");
        }


        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, { // Replace with your Cloudinary cloud name
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                setloading(false);
                throw new Error(`Cloudinary upload failed with status: ${response.status}`);
            }

            const data = await response.json();
            return data.secure_url; // URL of the uploaded image
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return null;
        }
    };


    const visitPricing = () => {
        router.push("/pricing");
    }


    return (

        <div className="max-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200" style={{ width: "100%", alignContent: "center" }}>
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
                    {/* Card 1: Image Upload */}
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Upload Wireframe Image</h2>
                        {!imagePreview ? (
                            <>
                                <CloudUpload className="mx-auto text-gray-500" size={40} />
                                <p className="text-center text-gray-500 mt-2 text-sm">Upload your image</p>
                                <Input
                                    type="file"
                                    id="fileUpload"
                                    className="hidden"
                                    onChange={onUpload}
                                    multiple={false}
                                />
                                <label htmlFor="fileUpload" className="block w-1/2 mx-auto mt-4">
                                    <div className="bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg p-2 text-center cursor-pointer hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-200">
                                        Upload
                                    </div>
                                </label>
                            </>
                        ) : (
                            <div className="relative">
                                <X
                                    className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-200"
                                    onClick={() => setimagePreview(null)}
                                />
                                <Image src={imagePreview} alt="Preview" width={400} height={200} className="rounded-lg w-full" />
                            </div>
                        )}
                    </div>

                    {/* Card 2: AI Model Selection and Description */}
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Generate Code</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Select AI Model</label>
                            <Select onValueChange={setSelectedAIModel} value={selectedAIModel}>
                                <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg">
                                    <SelectValue placeholder="Select AI Model" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                                    {Constants.AiModelList.map((model, index) => (
                                        <SelectItem key={index} value={model.value} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200">
                                            {model.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Description</label>
                            <Textarea
                                rows={6}
                                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg"
                                placeholder="Add some description about your image to generate more accurate results"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={generateCode}
                            disabled={loading}
                            className="w-full py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg mt-4 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            {" "}
                            Generate Code
                        </Button>
                        {generatedCode && (
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                <pre className="text-sm text-gray-700 dark:text-gray-200 overflow-x-auto">
                                    <code>{generatedCode}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer for Insufficient Credits */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                    <div className="mx-auto w-full max-w-md p-6">
                        <DrawerHeader>
                            <DrawerTitle className="flex items-center gap-2 text-lg font-semibold">
                                <AlertTriangle className="text-red-500" />
                                Error
                            </DrawerTitle>
                            <DrawerDescription className="text-gray-600 dark:text-gray-300">
                                {errorMessage || "An unexpected error occurred. Please try again or contact support."}
                                <div className='mt-4 flex justify-center'>
                                    {buttonenabled && (
                                        <Button onClick={visitPricing} className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white rounded-md mt-4 flex items-center">
                                            <Wallet className="mr-2 w-5 h-5" />
                                            Add Credits
                                        </Button>
                                    )}
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button onClick={() => setDrawerOpen(false)} className="bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg">
                                Close
                            </Button>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

        </div>

    )
}

export default ImageUpload