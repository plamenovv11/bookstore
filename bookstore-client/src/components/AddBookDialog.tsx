import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';
import { Book } from '../common/types';
import ImageUploader from './ImageUploader';

interface AddBookDialogProps {
    open: boolean;
    handleClose: () => void;
    onSubmitHandler: (book: Partial<Book>) => void;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({ open, handleClose, onSubmitHandler }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleImageUpload = (url: string) => {
        setImageUrl(url); // Set the uploaded image URL
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: any = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        const book: Partial<Book> = {
            title: formJson.title as string,
            author: formJson.author as string,
            description: formJson.description as string,
            price: parseFloat(formJson.price as string),
            publishedDate: formJson.publishedDate as string,
            genre: formJson.genre as string,
            imageUrl: imageUrl || '', // Include the image URL
        };

        setIsSubmitting(true);
        onSubmitHandler(book);
        setIsSubmitting(false);

        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                sx: {
                    borderRadius: 4,
                    maxWidth: 600,
                    margin: "auto",
                    padding: 2,
                },
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Add a New Book</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the details of the book you want to add.
                </DialogContentText>

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="author"
                    name="author"
                    label="Author"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                />
                <TextField
                    required
                    margin="dense"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    inputProps={{ step: "0.01" }}
                />
                <TextField
                    required
                    margin="dense"
                    id="publishedDate"
                    name="publishedDate"
                    label="Published Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    margin="dense"
                    id="genre"
                    name="genre"
                    label="Genre"
                    type="text"
                    fullWidth
                    variant="standard"
                />

                <ImageUploader onImageUpload={handleImageUpload} />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

                {/* Show loader when submitting */}
                <Button type="submit" disabled={isSubmitting || !imageUrl}>
                    {isSubmitting ? (
                        <CircularProgress size={24} />
                    ) : (
                        'Add Book'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;
