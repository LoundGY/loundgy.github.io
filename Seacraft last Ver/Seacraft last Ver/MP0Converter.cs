using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml;
using System.Collections;
using System.Net;
using System.IO;

namespace Seacraft_last_Ver
{
    class MP0Converter
    {
        private XmlNode placemark;
        protected string name = "";
        protected int count = 0;
        protected string coordinates = "";
        public MP0Converter(XmlNode placemark, string name)
        {
            this.placemark = placemark;

            XmlDocument doc = new XmlDocument();
            doc.LoadXml("<TestTegFor>" + placemark.InnerXml + "</TestTegFor>");
            XmlElement xRoot = doc.DocumentElement;

            foreach (XmlNode node in placemark.ChildNodes)
            {
                if (node.Name.ToLower() == "name")
                {
                    this.name = node.InnerText;
                }
                XmlNodeList placemarkNode = xRoot.GetElementsByTagName("coordinates");
                if (placemarkNode.Count < 1)
                {
                    placemarkNode = xRoot.GetElementsByTagName("gx:coord");
                    string coords = "";
                    foreach (XmlNode xmCoords in placemarkNode)
                    {
                        coords += xmCoords.InnerText.Trim() + " ";
                    }
                    this.count = placemarkNode.Count;
                    this.coordinates = coords;
                }
                else
                {
                    this.coordinates = placemarkNode[0].InnerText.Trim();
                    this.count = (this.coordinates.Split(',').Length - 1) / 2;
                }
            }
            if (this.name.Length < 1)
            {
                this.name = name;
            }
        }

        public string getStartPoint()
        {
            var allCoordinates = this.coordinates.Split(' ', ',');
            double firstPoint, secondPoint, thirdPoint;
            Double.TryParse(allCoordinates[1].Replace('.', ','), out firstPoint);
            Double.TryParse(allCoordinates[0].Replace('.', ','), out secondPoint);


            string sURL;
            string decl = "0";
            sURL =
                    "http://www.ngdc.noaa.gov/geomag-web/calculators/calculateIgrfgrid?lat1=" + allCoordinates[1] + "&lat2=" + allCoordinates[1] + "&lon1=" + allCoordinates[0] + "&lon2=" + allCoordinates[0] +
                    "&latStepSize=0.1&lonStepSize=0.1&magneticComponent=d&resultFormat=xml";
            try
            {
                using (var webClient = new WebClient())
                {

                    var response = webClient.DownloadString(sURL);
                    XmlDocument doc = new XmlDocument();
                    doc.LoadXml("<TestTegFor>" + response + "</TestTegFor>");
                    XmlElement xRoot = doc.DocumentElement;
                    XmlNodeList declination = xRoot.GetElementsByTagName("declination");
                    decl = declination[0].InnerText;
                }
            }
            catch (Exception e)
            {
                decl = "0";
            }


            Double.TryParse(decl.Replace('.', ','), out thirdPoint);

            return Math.Round(firstPoint, 6).ToString().Replace(',', '.') + " " + Math.Round(secondPoint, 6).ToString().Replace(',', '.') + " " + Math.Round(thirdPoint, 6).ToString().Replace(',', '.');
        }

        public string getAllCoord()
        {
            var allCoordinates = this.coordinates.Split(' ', ',');
            string myStr = "";
            for (int i = 1; i < this.count; i++)
            {
                double firstPoint, secondPoint, thirdPoint;
                Double.TryParse(allCoordinates[i * 3 + 1].Replace('.', ','), out firstPoint);
                Double.TryParse(allCoordinates[i * 3].Replace('.', ','), out secondPoint);
                Double.TryParse(allCoordinates[i * 3 + 2].Replace('.', ','), out thirdPoint);
                //1 4 7
                //0 3 6
                //2 5 8
                myStr += this.calcCoord(firstPoint, secondPoint, thirdPoint);
            }
            return myStr;
        }
        public string getInfo()
        {
            string result = "";
            result += "@" + this.name + "\n";
            result += "#" + (this.count - 1) + "\n";
            result += "$" + getStartPoint() + "\n";
            return result;
        }
        public ArrayList getCoordinates()
        {
            string[] result = getAllCoord().Split('\n');
            ArrayList list = new ArrayList();
            foreach (string a in result)
            {
                if (a.Trim().Length > 0)
                    list.Add(a);
            }
            return list;
        }

        public string calcCoord(double x, double y, double z)
        {
            var allCoordinates = this.coordinates.Split(',', ' ');
            double latitude_0 = Convert.ToDouble(allCoordinates[1].Replace('.', ','));
            double longitude_0 = Convert.ToDouble(allCoordinates[0].Replace('.', ','));
            double ALFA = latitude_0 * Math.PI / 180;
            double mpd_latt = 111132.09 - 566.05 * Math.Cos(2 * ALFA) + 1.2 * Math.Cos(4 * ALFA) - 0.002 * Math.Cos(6 * ALFA); //для угла наклона  
            double mpd_long = 111415.13 * Math.Cos(ALFA) - 94.55 * Math.Cos(3 * ALFA) + 0.12 * Math.Cos(5 * ALFA);
            double xn = (x - latitude_0) * mpd_latt;
            double yn = (y - longitude_0) * mpd_long;
            return Math.Round(xn).ToString().Replace(',', '.') + " " + Math.Round(yn).ToString().Replace(',', '.') + " " + "0\n";
            //где X0, Y0 - координаты точки WP0 (0,0), а XN и YN - координаты точки WPN. LATTITUDE_N и LONGITUDE_N и LATTITUDE_0 и LONGITUDE_0 - GPS-координаты точки WPN и WP0 соответственно.
            //где: this.startCoord.tilt - угол широты точки WP0(если Math.cos принимает радианы, то он должен быть в радианах).
        }
    }
}
