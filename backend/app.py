from flask import Flask, request, jsonify, send_from_directory
from gradio_client import Client, handle_file
import os
import uuid
import base64  # Asegúrate de importar base64

app = Flask(__name__)

# Carpeta para guardar imágenes públicas
PUBLIC_FOLDER = os.path.join(os.getcwd(), "public")
os.makedirs(PUBLIC_FOLDER, exist_ok=True)

# Ruta para procesar la imagen
@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        # Obtén los datos enviados desde la app
        data = request.get_json()
        img_base64 = data.get("img_base64")
        prompt = data.get("prompt", "Default")

        # Decodifica la imagen Base64 y guárdala como un archivo temporal
        temp_image_path = os.path.join(PUBLIC_FOLDER, f"{uuid.uuid4()}.png")
        with open(temp_image_path, "wb") as f:
            f.write(base64.b64decode(img_base64))

        # Configura el cliente de Gradio
        client = Client("finegrain/finegrain-object-cutter")
        result = client.predict(
            img=handle_file(temp_image_path),
            prompt=prompt,
            api_name="/process_prompt"
        )

        # Copia la imagen recortada a la carpeta pública
        cropped_image_path = result[1]["value"]
        public_cropped_image_path = os.path.join(PUBLIC_FOLDER, os.path.basename(cropped_image_path))
        os.rename(cropped_image_path, public_cropped_image_path)

        # Devuelve la URL pública
        public_url = f"http://{request.host}/public/{os.path.basename(public_cropped_image_path)}"
        return jsonify({"cropped_image_url": public_url}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para servir imágenes públicas
@app.route('/public/<filename>')
def serve_image(filename):
    return send_from_directory(PUBLIC_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)