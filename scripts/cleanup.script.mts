import {
  ConstructorDeclaration,
  createProject,
  editImports,
  getClasses,
  getConstructors,
  getImports,
  getParams, getProperties,
  NgMorphTree,
  ParameterDeclaration,
  saveActiveProject,
  setActiveProject,
} from "ng-morph";

const ICON_REGISTRY_INJECTION_NAME = "IconRegistry";
const FRAMEWORK_IMPORT_PATH = "my-framework";
const ICONS_LIB_IMPORT_PATH = "my-icons-lib";

setActiveProject(createProject(new NgMorphTree(), "/", ["**/*.ts"]));

function cleanUp() {
  // cleanupImportStatements();
  // cleanUpInjectStatements();
  // cleanupConstructors();
  // saveActiveProject();
}

function cleanUpInjectStatements(){
  const declarations = getProperties(getClasses('./src/**/*.ts'));
  declarations.forEach((declaration) => {
    if(declaration.getType().getText().includes(ICON_REGISTRY_INJECTION_NAME)){
      declaration.remove();
    }
  });
}

function cleanupImportStatements() {
  cleanupFrameworkImports();
  removeIconsImports();
}

function removeIconsImports() {
  const iconsImports = getImports("./src/**/*.ts", {
    moduleSpecifier: ICONS_LIB_IMPORT_PATH,
  });

  iconsImports.forEach((iconsImport) => {
    iconsImport.remove();
  });
}

function cleanupFrameworkImports() {
  const frameworkImports = getImports("./src/**/*.ts", {
    moduleSpecifier: FRAMEWORK_IMPORT_PATH,
  });

  editImports(frameworkImports, (entity): any => ({
    namedImports: [
      ...entity.namedImports.filter(
        (namedImport: any) => namedImport.name !== ICON_REGISTRY_INJECTION_NAME
      ),
    ],
  }));
}

function cleanupConstructors() {
  const constructorDeclarations = getConstructors(getClasses("./src/**/*.ts"));
  constructorDeclarations.forEach((constructorDeclaration) => {
    const constructorParams = getParams(constructorDeclaration);

    removeRegisterStatement(constructorDeclaration);
    removeIconRegistryInjection(constructorParams);
  });
}

function removeRegisterStatement(
  constructorDeclaration: ConstructorDeclaration
) {
  constructorDeclaration.getStatements().forEach((s) => {
    if (s.getText().includes(`registerIcons(`)) {
      s.remove();
    }
  });
}

function removeIconRegistryInjection(
  constructorParams: ParameterDeclaration[]
) {
  const iconRegistryParam = constructorParams.find(
    (param) => param.getTypeNode()?.getText() === ICON_REGISTRY_INJECTION_NAME
  );
  if (iconRegistryParam) {
    iconRegistryParam.remove();
  }
}

cleanUp();
