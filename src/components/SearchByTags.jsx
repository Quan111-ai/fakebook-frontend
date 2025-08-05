import React, { useState, useEffect } from "react";
import { 
  TextField, Button, Typography, List, ListItem, ListItemText, 
  CircularProgress, Chip, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchByTags = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tags");
        setTags(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleSearch = async () => {
    if (selectedTags.length === 0) return;
    setLoading(true);
    try {
      const queryString = selectedTags.join(",");
      const res = await axios.get(`http://localhost:3000/posts/by-tags?tags=${queryString}`);
      setResults(res.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm bài viết:", error.response?.data || error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (inputTag && !selectedTags.includes(inputTag)) {
      setSelectedTags([...selectedTags, inputTag]);
      setInputTag("");
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <IconButton color="#5D4037" onClick={() => setOpen(true)}>
        <TagIcon fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tìm kiếm bài viết theo Tags</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Nhập hoặc chọn tag để tìm bài viết:
          </Typography>

          <TextField 
            label="Nhập tag"
            variant="outlined"
            fullWidth
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTag()}
            style={{ marginBottom: "10px" }}
          />
          <Button onClick={addTag} variant="contained" color="primary">Thêm</Button>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
            {selectedTags.map((tag) => (
              <Chip key={tag} label={tag} color="secondary" onDelete={() => removeTag(tag)} />
            ))}
          </div>

          <Button onClick={handleSearch} variant="contained" color="success" style={{ marginTop: "10px" }}>Tìm kiếm</Button>

          {loading ? (
            <CircularProgress />
          ) : (
            results.length > 0 && (
              <List>
                {results.map((post) => (
                  <ListItem key={post._id} button component={Link} to={`/posts/${post._id}`}>
                    <ListItemText primary={post.title} />
                  </ListItem>
                ))}
              </List>
            )
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchByTags;
