# Project 3: Around The U.S.

This is the third project in the Software Engineering program at TripleTen. It was created using HTML, CSS, and Javascript, based on a given design brief.

## Project Features

- **Responsive design**: Adapts to desktop, tablet, and mobile views
- **CSS Grid**: Used for layout management
- **Hover effects**: Includes transitions for interactive elements
- **Flat BEM file structure**: Organized CSS following the BEM methodology
- **Modal windows**: For displaying additional content
- **JavaScript interactivity**:
  - Adding and removing cards dynamically
  - Saving form data when forms are closed without submission
  - ES6 modular class structure for better organization
- **Webpack**: Used for module bundling and asset management
  - Hot Module Replacement: See changes in the dev server without page reload
  - Build Artifacts: After building project in Webpack, production-ready files will be located in the 'dist' directory

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/g-dilek/se_project_aroundtheus.git
cd se_project_aroundtheus
```

### 2. Install Dependencies

Before running the project, you need to install the necessary dependencies. Use 'npm' to install them:

```
npm install
```

### 3. Build the Project

To prepare the project for development, build the project using Webpack. This will compile and bundle the assets:

```
npm run build
```

### 4. Run the Development Server

Start the development server to view the project in your browser. This will enable live reloading, so changes to the code will be reflected automatically.

```
npm run dev
```

The project will be available at http://localhost:8080 or another port specified in your Webpack configuration.

### 5. Open the Project in your Browser

Navigate to http://localhost:8080 in your browser to see the project in action.

## Additional Notes

If you encounter any issues or have questions, please refer to the
[Webpack documentation](https://webpack.js.org/) or feel free to reach out to me.
