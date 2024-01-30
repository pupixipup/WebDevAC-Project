const stores = require("../stores.json")
const fs = require("fs")
const axios = require("axios")
function downloadImages() {
stores.forEach((store, i) => {
    setTimeout(() => {
    downloadOne(store)
    }, i * 100)
})
}
downloadImages()

async function downloadOne(store) {
    try {
        const { image: url, name} = store;
        const response = await axios.get(url, {
            responseType: "arraybuffer"
        })

        // const path = "/locations/"
        const buffer = Buffer.from(response.data)
        const filename = normalizeName(name) + Date.now();
        const path = "locations/" + filename + ".jpg"
        store.file_url = path;
        fs.writeFileSync("../public/" + path, buffer);
        fs.writeFileSync("../stores.json", JSON.stringify(stores));
        console.log('Image downloaded and saved successfully.');
    } catch (error) {
        console.error('Error downloading image:', error.message);
    }
}

function normalizeName(name){
    const sanitizedName = name.replace(/[\/?<>\\:*|"]/g, '');
   return sanitizedName.substring(0, 100).toLowerCase().replaceAll(" ", "")
}