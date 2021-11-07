using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Xml;
using System.Net;
using System.IO;
using System.IO.Ports;
using System.Diagnostics;
using System.Threading;
using System.Collections;
using System.Text.RegularExpressions;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace Seacraft_last_Ver
{
    /// <summary>
    /// Логика взаимодействия для Converter.xaml
    /// </summary>
    public partial class Converter : Page
    {
        public ArrayList allCoord = new ArrayList();
        public string fileTitile = "";
        public string topInfo = "";
        public Converter()
        {
            InitializeComponent();
            //dataGridView1.RowHeight(20);
        }

        private void clear_Data()
        {
            ObservableCollection<int> myData = new ObservableCollection<int>();
            dataGridView1.ItemsSource = myData;
            download_butt.Visibility = Visibility.Hidden;
            richTextBox1.Document.Blocks.Clear();
            this.allCoord.Clear();
            this.fileTitile = "";
            this.topInfo = "";
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            SaveFileDialog saveFileDialog1 = new SaveFileDialog();
            saveFileDialog1.Filter = "Text files(*MP0)|*MP0";
            saveFileDialog1.FileName = this.fileTitile + ".MP0";
            saveFileDialog1.ShowDialog();
            if (saveFileDialog1.FileName.Length < 1)
                return;
            string filename = saveFileDialog1.FileName;
            string extencion = System.IO.Path.GetExtension(filename);
            if (extencion.ToLower() != ".mp0")
            {
                filename += ".MP0";
            }
            string allInfo = this.topInfo;

            for (int i = 0; i < dataGridView1.Items.Count; i++)
            {
                allInfo += (dataGridView1.Items[i] as Coordinates).Coordinate + " " + (dataGridView1.Items[i] as Coordinates).Title + "\n";
            }

            // сохраняем текст в файл
            System.IO.File.WriteAllText(filename, allInfo);
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            clear_Data();
            try
            {
                OpenFileDialog openFileDialog1 = new OpenFileDialog();
                openFileDialog1.Filter = "Maps files|*.mp0;*.kml;";
                openFileDialog1.ShowDialog();
                // получаем выбранный файл
                string filename = openFileDialog1.FileName;
                if (filename.Length < 1)
                {
                    return;
                }
                string extencion = System.IO.Path.GetExtension(filename);
                if (extencion.ToLower() == ".kml")
                {
                    XmlDocument xDoc = new XmlDocument();
                    xDoc.Load(filename);
                    XmlElement xRoot = xDoc.DocumentElement;
                    XmlNodeList placemarkNode = xRoot.GetElementsByTagName("Placemark");
                    this.fileTitile = System.IO.Path.GetFileNameWithoutExtension(filename);
                    MP0Converter placemark = new MP0Converter(placemarkNode[0], System.IO.Path.GetFileNameWithoutExtension(filename));
                    this.topInfo = placemark.getInfo();
                    this.allCoord = placemark.getCoordinates();
                }
                else
                {
                    // читаем файл в строку
                    string fileText = System.IO.File.ReadAllText(filename);
                    this.fileTitile = System.IO.Path.GetFileNameWithoutExtension(filename);
                    string[] allInFile = fileText.Split('\n');
                    this.topInfo = "";
                    for (int i = 0; i < allInFile.Length; i++)
                    {
                        if (i < 3)
                        {
                            this.topInfo += allInFile[i] + "\n";
                        }
                        else
                        {
                            if (allInFile[i].Trim().Length > 0)
                            {
                                this.allCoord.Add(allInFile[i]);
                            }
                        }
                    }
                }
                ObservableCollection<Coordinates> myData = new ObservableCollection<Coordinates>();
                foreach (string coord in allCoord)
                {

                    string[] thisCoord = coord.Split(' ');
                    Coordinates data = new Coordinates { Coordinate = "", Title = "" };
                    if (thisCoord.Length > 3)
                    {
                        data = new Coordinates { Coordinate = (thisCoord[0] + " " + thisCoord[1] + " " + thisCoord[2]).Trim(), Title = thisCoord[3].Trim() };
                    }
                    else if (thisCoord.Length == 3)
                    {
                        data = new Coordinates { Coordinate = (thisCoord[0] + " " + thisCoord[1] + " " + thisCoord[2]).Trim(), Title = "" };
                    }

                    myData.Add(data);
                }
                dataGridView1.ItemsSource = myData;
                dataGridView1.Columns[0].IsReadOnly = true;
                dataGridView1.Columns[0].CanUserSort = false;
                dataGridView1.Columns[0].CanUserReorder = false;
                dataGridView1.Columns[0].Width = new DataGridLength(10, DataGridLengthUnitType.Star);
                dataGridView1.Columns[1].CanUserSort = false;
                dataGridView1.Columns[1].CanUserReorder = false;
                dataGridView1.Columns[1].Width = new DataGridLength(10, DataGridLengthUnitType.Star);
                dataGridView1.CanUserAddRows = false;
                richTextBox1.Document.Blocks.Clear();
                richTextBox1.Document.Blocks.Add(new Paragraph(new Run(this.topInfo.Trim())));
                download_butt.Visibility = Visibility.Visible;
            }
            catch (Exception exc)
            {
                MainWindow main = Application.Current.MainWindow as MainWindow;
                main.Content = new Converter();
                MessageBox.Show("Choose other file! ", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            MainWindow main = Application.Current.MainWindow as MainWindow;
            main.Content = new Main();
        }

    }
}
