import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="LTX-Video Local Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device detection for Apple Silicon
device = "mps" if torch.backends.mps.is_available() else "cpu"

class GenerateRequest(BaseModel):
    prompt: str
    num_frames: int = 24
    width: int = 512
    height: int = 512

@app.post("/generate")
async def generate_video(req: GenerateRequest):
    try:
        print(f"Empfange Anfrage für Video-Generierung: '{req.prompt}' auf Gerät: {device}")
        # Hier würden wir normalerweise die Pipeline laden, z.B.:
        # from diffusers import LTXVideoPipeline
        # pipe = LTXVideoPipeline.from_pretrained("Lightricks/LTX-Video", torch_dtype=torch.float16)
        # pipe.to(device)
        # video = pipe(prompt=req.prompt, num_frames=req.num_frames, width=req.width, height=req.height).frames
        
        # Für den Moment simulieren wir den Erfolg
        return {
            "status": "success",
            "message": f"Simuliertes Video für '{req.prompt}' erstellt.",
            "device_used": device,
            "video_url": "/mock_video_output.mp4"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print(f"Starte LTX-Video Server auf Gerät: {device}")
    uvicorn.run(app, host="0.0.0.0", port=8000)
