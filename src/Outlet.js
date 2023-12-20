import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Modal } from "@mui/material";
import CodeEditor from "./CodeEditor";
import "animate.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflow: "auto",
  backgroundColor: "rgb(50,50,50)",
};

function Outlet() {
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const codeString1 = `
  library(shiny)
  library(readr)
  library(doBy)
  
  ui <- fluidPage(
  
      sidebarLayout(
          sidebarPanel(
            fileInput("file", "Seleccione un archivo CSV:"),
            sliderInput("year_range", "Seleccione el rango de años:",
                        min = 2016, max = 2023, value = c(2016, 2023), step = 1),
            checkboxGroupInput("brands", "Seleccione las marcas:", choices = "", selected = "")
          ),
  
          mainPanel(
             plotOutput("barplot")
          )
      )
  )
  
  server <- function(input, output, session) {
    
    df_cel <- reactive({
      req(input$file)  # Asegura que se haya cargado un archivo
      df <- read.csv(input$file$datapath, sep = ";")
      df$announcement_date <- as.Date(df$announcement_date, format = "%d/%m/%Y")
      df$year <- format(df$announcement_date, "%Y")
      df
    })
    
    observeEvent(df_cel(), {
      choices_brands <- unique(df_cel()$brand)
      updateCheckboxGroupInput(session, "brands", choices = choices_brands, selected = choices_brands)
    })
    
      output$barplot  <- renderPlot({
        
        req(df_cel())  # Usa df_cel() en lugar de df_cel
        
        # Filtrar los datos
        df_cel_filtered <- df_cel()[df_cel()$year %in% seq(input$year_range[1], input$year_range[2]), ]
        df_cel_filtered <- df_cel_filtered[df_cel_filtered$brand %in% input$brands, ]
        
        print(df_cel_filtered)
        
        if (length(unique(df_cel_filtered$brand)) > 0) {
        # Contar la cantidad de marcas por año en los datos filtrados
        brand_counts_filtered <- as.matrix(table(df_cel_filtered$year, df_cel_filtered$brand))
        
        print(brand_counts_filtered)
        
        barplot(brand_counts_filtered, beside = TRUE,
                col = rainbow(length(unique(df_cel_filtered$brand))),
                main = "Cantidad de Modelos por Año",
                xlab = "Año",
                ylab = "Cantidad",
                legend = TRUE)
        } else {
          print("No hay marcas seleccionadas.")
        }
      })
    
      
  }
  
  # Run the application 
  shinyApp(ui = ui, server = server)`;
  const codeString2 = `
  library(shiny)
  library(readr)
  library(ggplot2)
  library(dplyr)
  
  colores <- c(
    "#FF0000",  # Rojo
    "#00FF00",  # Verde
    "#0000FF",  # Azul
    "#FFFF00",  # Amarillo
    "#FF00FF",  # Magenta
    "#00FFFF",  # Cyan
    "#FF8000",  # Naranja
    "#0080FF"   # Azul claro
  )
  
  
  # Define UI for application that draws a histogram
  ui <- fluidPage(
    
    sidebarLayout(
      sidebarPanel(
        fileInput("file", "Seleccione un archivo CSV:"),
        sliderInput("year", "Seleccione el año:",
                    min = 2016, max = 2023, value = 2016, step = 1),
      ),
  
      mainPanel(
        plotOutput("barplot")
      )
    )
  )
  
  # Define server logic required to draw a histogram
  server <- function(input, output, session) {
    
    df_cel <- reactive({
      req(input$file)  # Asegura que se haya cargado un archivo
      df <- read.csv(input$file$datapath, sep = ";")
      df$announcement_date <- as.Date(df$announcement_date, format = "%d/%m/%Y")
      df$year <- format(df$announcement_date, "%Y")
      df
  
    })
    
    output$barplot  <- renderPlot({
      
      req(df_cel())  # Usa df_cel() en lugar de df_cel
  
      df_filtered <- df_cel() %>%
        filter(year == input$year)
      
        ggplot(df_filtered, aes(x = "", fill = as.factor(storage_GB))) +
          geom_bar(width = 1) +
          coord_polar("y") +
          ggtitle("Gráfico de Pastel de Almacenamiento") +
          scale_fill_manual(values = colores,name = "Storage")
  
    })
    
  }
  
  # Run the application 
  shinyApp(ui = ui, server = server)`;
  const codeString3 = `
  library(shiny)
  library(readr)
  library(ggplot2)
  library(lmtest)
  
  # Define UI for application that draws a histogram
  ui <- fluidPage(
    
      plotOutput("barplot"),
   
    hr(),
    
    fluidRow(
      column(3,
             fileInput("file", "Seleccione un archivo CSV:"),
             ),
      column(3,
             selectInput("x_variable", "Seleccione la variable para el eje X:",
                         choices = c("battery", "inches", "ram_GB", "storage_GB")),
      ),
      column(3,
             selectInput("y_variable", "Seleccione la variable para el eje Y:",
                         choices = c("price_USD")),
      ),
      column(3,
             numericInput("val_predict", "Ingrese el valor para la predicción:", value = 32)
      )
      )
    
    )
  
  
  server <- function(input, output, session) {
    
    df_cel <- reactive({
      req(input$file)  # Asegura que se haya cargado un archivo
      df <- read.csv(input$file$datapath, sep = ";")
      df$announcement_date <- as.Date(df$announcement_date, format = "%d/%m/%Y")
      df$year <- format(df$announcement_date, "%Y")
      df
    })
    
    
    output$barplot  <- renderPlot({
      req(df_cel())  # Usa df_cel() en lugar de df_cel
      
      formula <- as.formula(paste(input$y_variable, "~", input$x_variable))
      modelo <- lm(formula, data = df_cel())
      
      nueva_observacion <- df_cel()
      nueva_observacion[[input$x_variable]] <- input$val_predict
      
      prediccion <- predict(modelo, nueva_observacion)
      
      cat("El valor predicho es:", prediccion, "\n")
      
      plot(df_cel()[[input$x_variable]], df_cel()[[input$y_variable]], main = "Regresión Lineal",
           xlab = input$x_variable, ylab = input$y_variable)
      abline(modelo, col = "red")  # Agrega la línea de regresión en color rojo
      points(nueva_observacion[[input$x_variable]], prediccion, col = "blue", pch = 19)    
      mtext(paste("Predicción para", input$x_variable, " de ", input$val_predict, " es ", prediccion), side = 1, line = 4)
     
    })
    
    
  }
  
  # Run the application 
  shinyApp(ui = ui, server = server)
`;

  return (
    <div style={{ height: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Cantidad de Modelos por año" value="1" />
              <Tab label="Análisis Univariado" value="2" />
              <Tab label="Regresión Lineal" value="3" />
              <Tab label="Marca-SO-Precio" value="4" />
              <Tab label="Análisis Multivariado" value="5" />
              <Tab label="Análisis Multivariado" value="6" />
            </TabList>
          </Box>
          <Button variant="contained" onClick={handleOpen}>
            Mostrar código
          </Button>

          <TabPanel value="1" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://dibuqwerty.shinyapps.io/app1/"
            ></iframe>
          </TabPanel>
          <TabPanel value="2" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://dibuqwerty.shinyapps.io/Analisis-Univariado/"
            ></iframe>
          </TabPanel>

          <TabPanel value="3" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://dibuqwerty.shinyapps.io/app3/"
            ></iframe>
          </TabPanel>
          <TabPanel value="4" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://dibuqwerty.shinyapps.io/brand-price-so/"
            ></iframe>
          </TabPanel>
          <TabPanel value="5" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://dibuqwerty.shinyapps.io/scatter/"
            ></iframe>
          </TabPanel>
          <TabPanel value="6" sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://4p361u-c0-machicado.shinyapps.io/app_multivariados/"
            ></iframe>
          </TabPanel>
        </TabContext>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CodeEditor
              codeString={
                value === "1"
                  ? codeString1
                  : value === "2"
                  ? codeString2
                  : codeString3
              }
            />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default Outlet;
