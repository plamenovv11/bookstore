import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import { useCreateImageMutation } from '../services/api';

interface ImageUploaderProps {
    onImageUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploadImage, { isLoading, isSuccess, data: result }] = useCreateImageMutation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            uploadImage(formData);
        }
    };

    useEffect(() => {
        if (isSuccess && result) {
            console.log(result);
            const url = result?.imageUrl;
            setImageUrl(url);
            onImageUpload(url);
        }
    }, [isSuccess, result, onImageUpload]);

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    disabled={isLoading}
                >
                    Select Book Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Box>

            {selectedFile && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Selected file: {selectedFile.name}
                </Typography>
            )}

            {imageUrl && (
                <Typography variant="body2" color="green">
                    Image uploaded successfully!
                </Typography>
            )}
        </div>
    );
};

export default ImageUploader;
