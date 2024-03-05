# Gunakan image Node.js versi terbaru sebagai base image
FROM node:latest

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app


# Menyalin semua file proyek ke dalam direktori kerja di dalam container
COPY . .

# Install dependensi yang diperlukan
RUN npm install

# Build aplikasi Next.js untuk produksi
RUN npm run build

# Menjalankan aplikasi Next.js pada port 3000
EXPOSE 5000
CMD ["npm", "start"]