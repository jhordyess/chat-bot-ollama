# Chat Bot App

A simple chat bot application built using Next.js and Ollama.

## Description

The Chat Bot App allows users to interact with a chatbot powered by the Ollama. The app provides a user-friendly interface for sending messages and receiving responses from the chatbot.

- Ollama is configured to run in a Docker container.
- Pre-configured with NVIDIA GPU support for better performance.
- By default, it uses the [`gemma3:1b`](https://ollama.com/library/gemma3:1b) model, but you can change it to any other model available in the [Ollama library](https://ollama.com/library).

### Technologies Used

- JS Libraries: [Ollama-js](https://www.npmjs.com/package/ollama)
- Framework: [Next.js](https://nextjs.org/)
- Fonts: [Geist](https://fonts.google.com/specimen/Geist), [Geist Mono](https://fonts.google.com/specimen/Geist+Mono)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Containerization: [Docker](https://www.docker.com/)

## How to use

1. Clone the repository:

```bash
git clone git@github.com:jhordyess/chat-bot-ollama.git
```

2. Open the project folder:

```bash
cd chat-bot-ollama
```

3. Prepare the environment:

- Make sure you have [Docker](https://www.docker.com/) installed and running on your machine.
- Make sure you have [Node.js](https://nodejs.org/en/download) installed on your machine.
- Set up the NVIDIA Container Toolkit for Docker to enable GPU support. Follow the instructions in the [NVIDIA documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installation) to install the NVIDIA Container Toolkit. If you are using Ubuntu, use my custom [bash script](./ollama/nvidia.sh).
```bash
bash ./ollama/nvidia.sh
```
- (Optional) Set up the environment variables. Create a `.env` file in the root directory of the project, following the example in [`.env.example`](./.env.example). You can set the `MODEL_NAME` variable to specify the model you want to use. By default, it uses `gemma3:1b`.

3. Install the dependencies:

```bash
yarn install
```

4. Run the project:

```bash
yarn dev
```

5. Open the browser at <http://localhost:3000/>

## To-Do

- Improve UI/UX design.

## Contribution

If you would like to contribute to the project, open an issue or make a pull request on the repository.

## License

© 2025> [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license. See the [LICENSE](./LICENSE) file for more details.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)
