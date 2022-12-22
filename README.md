# Aidbox Develop Starter Guide Example Application

This is an example application for the [starter guide](https://github.com/beda-software/aidbox-develop-starter-guide). It contains a frontend [React](https://reactjs.org/) and an [Aidbox](https://www.health-samurai.io/aidbox) platform.

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:beda-software/aidbox-develop-starter-example.git
```

2. Change into the `aidbox-project` directory:

```bash
cd aidbox-project
```

3. Copy the file `.env.tpl` into the `aidbox-project` directory and replace `<your-license-key>` with the key that you can get on the [Aidbox portal](https://aidbox.app/).

4. Start the Aidbox platform by running the following command:

```bash
docker compose up
```

5. Change into the `frontend` directory in the second console window:

```bash
cd ../frontend
```

6. Install the dependencies:

```bash
yarn install
```

7. Start the frontend app:

```bash
yarn start
```

The frontend app should now be running on [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
