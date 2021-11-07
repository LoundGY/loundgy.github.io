using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Maps.MapControl.WPF;
using System.Xml;
using System.Collections;

namespace Seacraft_last_Ver
{
    class CoordinatesFromFile
    {
        private ArrayList coordinates;
        private ArrayList allCoordinate = new ArrayList();
        LocationCollection locs = new LocationCollection();
        private string startCoord = "";
        private string textFromFile = "";
        private string exp = "";
        public CoordinatesFromFile(string textFromFile, string exp)
        {
            this.exp = exp;
            this.textFromFile = textFromFile;
        }
        public LocationCollection getCoordinates()
        {
            if (exp.ToLower() == ".kml")
            {
                XmlDocument xDoc = new XmlDocument();
                xDoc.LoadXml(this.textFromFile);
                XmlElement xRoot = xDoc.DocumentElement;
                XmlNodeList placemarkNode = xRoot.GetElementsByTagName("Placemark");
                MP0Converter placemark = new MP0Converter(placemarkNode[0], "name");
                this.startCoord = placemark.getStartPoint();
                this.coordinates = placemark.getCoordinates();
                //
                string[] startPoint = this.startCoord.Trim('$').Split(' ');
                this.allCoordinate.Add(startPoint[0] + ' ' + startPoint[1]);
                //
                foreach (string coord in this.coordinates)
                {
                    string[] point = coord.Trim('$').Split(' ');
                    this.allCoordinate.Add(point[0] + ' ' + point[1]);
                }
            }
            else if (exp.ToLower() == ".mp0")
            {
                string[] allTextIn = this.textFromFile.Split('\n');
                for (int i = 2; i < allTextIn.Length; i++)
                {

                    if (allTextIn[i].Trim().Length > 0)
                    {
                        string[] point = allTextIn[i].Trim('$').Split(' ');
                        this.allCoordinate.Add(point[0] + ' ' + point[1]);
                    }

                }
            }
            convertCoords();
            return this.locs;
        }
        private void convertCoords()
        {
            string[] first_coord = (this.allCoordinate[0] as string).Split(' ');
            double latitude_0 = Convert.ToDouble(first_coord[0].Replace('.', ','));
            double longitude_0 = Convert.ToDouble(first_coord[1].Replace('.', ','));
            locs.Add(new Location(latitude_0, longitude_0));
            double ALFA = latitude_0 * Math.PI / 180;
            double mpd_latt = 111132.09 - 566.05 * Math.Cos(2 * ALFA) + 1.2 * Math.Cos(4 * ALFA) - 0.002 * Math.Cos(6 * ALFA); //для угла наклона  
            double mpd_long = 111415.13 * Math.Cos(ALFA) - 94.55 * Math.Cos(3 * ALFA) + 0.12 * Math.Cos(5 * ALFA);
            for (int i = 1; i < this.allCoordinate.Count; i++)
            {
                string[] coord = (this.allCoordinate[i] as string).Split(' ');
                double xn = Convert.ToDouble(coord[0].Replace('.', ','));
                double yn = Convert.ToDouble(coord[1].Replace('.', ','));
                double latitude_n = latitude_0 + xn / mpd_latt;
                double longitude_n = longitude_0 + yn / mpd_long;
                locs.Add(new Location(latitude_n, longitude_n));
            }
        }
    }
}
