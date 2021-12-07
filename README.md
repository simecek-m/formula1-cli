# Project
CLI tool for collecting data from multiple sources for a [formula1-server](https://github.com/simecek-m/formula1-server) project.

![formula1-data schema](https://i.imgur.com/H1zr7zh.png)

# Sources
## Formula 1 official page
Web scraper for Formula 1 [web page](https://www.formula1.com/). Collecting historical and current data about:
- seasons
- drivers
- teams
- races
- circuits

## REST Countries
[REST API](https://restcountries.com/) for collect informations about Countries:
- name
- code (International Olympic Committee country codes - IOC )
- flag

# Output
Output data are stored as separated CSV formatted files in data folder.

    data
      |- drivers.csv
      |- teams.csv
      |- races.csv
