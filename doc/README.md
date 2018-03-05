
# Design Documentation

### System Architecture
Illustration of the System Architecture diagram can be found in [SystemArchitecture.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/SystemArchitecture.jpeg)

The System Architecture consists of 3 main components. The Server application (Service application), the web application, and the mobile application.
The web application and the mobile application communicate with the server using HTTP as the protocol and JSON as the data format.
The server is connected to a MySQL database for persistence.

We decided to use JSON and not XML for communication between components because it is simple and well supported by the frameworks and languages that we use.

We decided to use MySQL as the database since it is free, our team is familiar with SQL, and it suites our datamodel.

A more detailed look into each application architecture is provided later in this document.

### Application Architecture Server
Illustration of the Server Application Architecture can be found in [ServerAppArchitecture.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/ServerAppArchitecture.jpeg)

The architecture is a typical service application architecture, it contains 3 main components, the data layer that communicates with the database (MySQL), the business logic layer, and the service layer that exposes HTTP urls.

### Application Architecture Web

Illustration of the Web Application Architecture can be found in [WebAppArchitecture.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/WebAppArchitecture.jpeg)

The architecture is a thin client component based MV* architecture. it consists of 3 main layers. The router layer is responsible for routing HTTP GET requests from the browser to components in the system (basically getting components based on the URL in the browser). The "MV* Components" layer contains all the components (or reusable modules) of the application, every reusable component uses MVC. Finally the service layer is responsible for communicating with the server through HTTP. 

### Application Architecture Mobile

Illustration of the Mobile Application Architecture can be found in [AndroidAppArchitecture.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/AndroidAppArchitecture.jpeg)

The architecture is a typical thin client web application architecture, and it contains 2 main layers. The View layer contains view logic, and it communicates with the data layer to get and update information (notice there is no business logic layer). The data layer is responsible for communicating with the server through HTTP and JSON. Both layers use a DataModel layer to create and get Objects because of Java's JSON support.

### Domain Model Diagram
Illustration of the newest version of the datamodel can be found here [DataModel-new.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/DataModel-new.jpeg)
Older sketches of the datamodel can be found in the same directory.

### Additional up-front design artifacts

Initial big user stories [Big User Stories.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/Big%20User%20Stories.jpeg)
Initial features brainstorming [FeaturesBrainstorm.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/FeaturesBrainstorm.jpeg)
Initial MVC sketch [MVC Sketch.jpeg](https://github.com/DimaMukhin/intern.apply/blob/master/doc/MVC%20Sketch.jpeg)
