// Image upload function
function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      const img = document.createElement("img");
      img.src = reader.result;
      document.body.appendChild(img);
    }
    reader.readAsDataURL(file);
  }
  
  // Caption generation function
  function generateCaption(image) {
    // Use a caption generation model, such as the OpenAI DALL-E API
    // to generate a caption for the given image
    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "image-alpha-001",
        "prompt": "Generate a caption for this image",
        "num_images": 1,
        "size": "256x256",
        "response_format": "url",
        "image": image
      })
    })
    .then(response => response.json())
    .then(data => {
      const caption = data.data[0].url;
      document.getElementById("caption").innerHTML = caption;
    })
    .catch(error => console.error(error));
  }
  
    <input type="file" onchange="uploadImage(event); generateCaption(this.files[0])">
 <div id="caption"></div>
