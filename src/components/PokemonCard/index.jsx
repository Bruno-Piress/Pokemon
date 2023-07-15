import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { styled } from "@mui/system";

const Overlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ImageWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(CardMedia)`
  max-width: 90%;
  max-height: 90%;
`;

const StyledCardContent = styled(CardContent)`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 30px;
  color: white;
`;

export default function PokemonCard({
  name,
  image,
  addPokemon,
  removePokemon,
  weight,
  height,
  types,
  abilities,
  stats,
  setNotificationCount,
  notificationCount,
}) {
  const [showCardContent, setShowCardContent] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = (event) => {
    event.stopPropagation();
    setShowCardContent(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  // Usa a imagem carregada se estiver disponível, caso contrário, usa a imagem padrão
  const displayImage = uploadedFile ? URL.createObjectURL(uploadedFile) : image;

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => setShowCardContent(true)}>
          <CardMedia
            component="img"
            height="150"
            image={displayImage}
            alt="green iguana"
          />
          <Typography
            gutterBottom
            variant="h5"
            style={{ textAlign: "center", marginBottom: "2px" }}
            component="div"
          >
            {name}
          </Typography>
          {showCardContent && (
            <StyledCardContent>
              <Typography variant="body2" color="inherit">
                Peso: {weight}
              </Typography>

              <Typography variant="body2" color="inherit">
                Tamanho: {height}
              </Typography>

              <Typography variant="body2" color="inherit">
                Tipos: {types.join(", ")}
              </Typography>

              <Typography variant="body2" color="inherit">
                Habilidades: {abilities.join(", ")}
              </Typography>

              <Typography variant="body2" color="inherit">
                Velocidade: {stats[0].base_stat}
              </Typography>

              <Typography variant="body2" color="inherit">
                Defesa: {stats[1].base_stat}
              </Typography>

              <Typography variant="body2" color="inherit">
                Ataque: {stats[2].base_stat}
              </Typography>

              <Typography variant="body2" color="inherit">
                HP: {stats[3].base_stat}
              </Typography>

              {image && (
                <div>
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                  <Button
                    component="span"
                    size="small"
                    color="primary"
                    onClick={handleUploadButtonClick}
                  >
                    Upload Image
                  </Button>
                </div>
              )}
            </StyledCardContent>
          )}
        </CardActionArea>
        <CardActions>
          {addPokemon && (
            <Button
              size="small"
              color="primary"
              style={{
                border: "2px solid black",
                color: "black",
                borderRadius: "20px",
              }}
              onClick={() => {
                if (!showCardContent) {
                  addPokemon();
                  setNotificationCount(notificationCount + 1);
                }
              }}
            >
              Adicionar à Pokédex
            </Button>
          )}
          {removePokemon && (
            <Button
              size="small"
              color="secondary"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={removePokemon}
            >
              Remover da Pokédex
            </Button>
          )}
        </CardActions>
      </Card>
      {showCardContent && (
        <Overlay onClick={() => setShowCardContent(false)}>
          <StyledCardContent>
            <ImageWrapper>
              <StyledImage
                component="img"
                src={displayImage}
                onClick={handleImageClick}
              />
            </ImageWrapper>
            <Typography variant="body2" color="inherit">
              Peso: {weight}
            </Typography>

            <Typography variant="body2" color="inherit">
              Tamanho: {height}
            </Typography>

            <Typography variant="body2" color="inherit">
              Tipos: {types.join(", ")}
            </Typography>

            <Typography variant="body2" color="inherit">
              Habilidades: {abilities.join(", ")}
            </Typography>

            <Typography variant="body2" color="inherit">
              Velocidade: {stats[0].base_stat}
            </Typography>

            <Typography variant="body2" color="inherit">
              Defesa: {stats[1].base_stat}
            </Typography>

            <Typography variant="body2" color="inherit">
              Ataque: {stats[2].base_stat}
            </Typography>

            <Typography variant="body2" color="inherit">
              HP: {stats[3].base_stat}
            </Typography>

            {image && (
              <div>
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    size="small"
                    color="primary"
                    onClick={handleUploadButtonClick}
                  >
                    Upload Image
                  </Button>
                </label>
              </div>
            )}
          </StyledCardContent>
        </Overlay>
      )}
    </>
  );
}
