# https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installation
echo "Set up the NVIDIA Container Toolkit for Docker"

echo "Adding the NVIDIA package repositories"

curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg &&
  curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list |
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' |
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

echo "Update the package lists and install the NVIDIA Container Toolkit"
sudo apt update &&
  sudo apt install nvidia-container-toolkit -y

echo "Configure the Docker service to use the NVIDIA runtime"
sudo nvidia-ctk runtime configure --runtime=docker &&
  sudo service docker restart

echo "Test the installation"
docker run --rm --gpus=all hello-world
