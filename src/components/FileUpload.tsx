import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import axiosInstance from "../axiosInstance";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { IKnowledge, IKnowledgeDTO } from "../types";

const FileUpload = ({
	addKnowledge,
}: {
	addKnowledge: (knowledge: IKnowledge) => void;
}) => {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState("idle");
	const [message, setMessage] = useState<{
		text: string;
		type: "fulfilled" | "rejected";
	}>({ text: "", type: "fulfilled" });
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			if (selectedFile.size <= 1048576) {
				// 1MB = 1048576 bytes
				setFile(selectedFile);
				setMessage({
					type: "fulfilled",
					text: "File is valid and ready to be uploaded.",
				});
			} else {
				setFile(null);
				setMessage({
					type: "rejected",
					text: "File size exceeds 1MB. Please select a smaller file.",
				});
			}
		}
	};

	const handleFileUpload = async () => {
		if (file) {
			setLoading("pending");
			// Handle file upload logic here
			const formData = new FormData();
			formData.append("file", file);

			try {
				const { data } = await axiosInstance.post<{
					data: IKnowledgeDTO;
				}>("/services/knowledge/add", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				addKnowledge({
					id: data.data.id,
					name: data.data.name,
					createdOn: data.data.created_on,
				});
				setMessage({
					type: "fulfilled",
					text: "File uploaded successfully!",
				});
				setLoading("fulfilled");
			} catch (error) {
				setMessage({
					type: "rejected",
					text: "Error uploading file. Please try again!",
				});
				setLoading("rejected");
			}
		}
	};

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Box>
			<Box sx={{ alignItems: "center" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flex: 1,
						border: "dashed 1px gray",
						borderRadius: 1,
					}}
				>
					<Button
						fullWidth
						onClick={handleButtonClick}
						sx={{
							height: "100%",
							width: "100%",
							textAlign: "left",
						}}
					>
						{file ? `File selected: ${file.name}` : "Select File"}
					</Button>
					<input
						ref={inputRef}
						type="file"
						accept=".txt"
						onChange={handleFileChange}
						style={{ display: "none" }}
					/>
				</Box>
				<Button
					fullWidth
					sx={{ mt: 1 }}
					startIcon={
						loading === "pending" ? (
							<CircularProgress size={15} />
						) : (
							<UploadFileRoundedIcon />
						)
					}
					variant="contained"
					disabled={!file || loading === "pending"}
					onClick={handleFileUpload}
				>
					{loading === "pending" ? "Uploading File" : "Upload File"}
				</Button>
			</Box>
			<Typography
				color={message.type === "fulfilled" ? "green" : "red"}
				variant="caption"
				sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
			>
				{message.text.length ? (
					message.type === "fulfilled" ? (
						<CheckCircleRoundedIcon
							sx={{ fontSize: 20, mr: 0.5 }}
						/>
					) : (
						<ErrorRoundedIcon sx={{ fontSize: 20, mr: 0.5 }} />
					)
				) : null}
				{message.text}
			</Typography>
		</Box>
	);
};

export default FileUpload;
