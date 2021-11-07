using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Maps.MapControl.WPF;
using System.Windows.Data;
using System.Xml.Linq;
using System.Windows.Documents;
using System.Windows.Input;
using Microsoft.Win32;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Seacraft_last_Ver
{
    /// <summary>
    /// Логика взаимодействия для MapPage.xaml
    /// </summary>
    public partial class MapPage : Page
    {
        public Map mapControl = new Map();
        public bool isRemoved = false;
        public MapPage()
        {
            InitializeComponent();
            LocationCollection locs = new LocationCollection();
            string mapKey = "3KpOvobzA28y1d9oSEdv~lkGuZ7H-lH6fXWLmx9nKkw~Aqw8hKe2NWljtwY_NOp906DPYdsjU_iSdtxBFxBycbrh6Q15LAvvO9h33lnFwvvQ";
            mapControl.CredentialsProvider = new ApplicationIdCredentialsProvider(mapKey);
            mainGrid.Children.Add(mapControl);
            mapControl.SetView(new Location(52, 20), 6);
            mapControl.LayoutUpdated += m_Map_LayoutUpdated;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MainWindow main = Application.Current.MainWindow as MainWindow;
            main.Content = new Main();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
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
                mapControl.Children.Clear();
                string extencion = System.IO.Path.GetExtension(filename);
                string fileText = System.IO.File.ReadAllText(filename);
                CoordinatesFromFile coords = new CoordinatesFromFile(fileText, extencion);
                LocationCollection locs = coords.getCoordinates();
                mapControl.SetView(locs[0], 10);
                int locIndex = 1;
                foreach (Location loc in locs)
                {
                    Pushpin push = new Pushpin();
                    push.Location = new Location(loc);
                    push.Cursor = Cursors.Hand;
                    push.Content = locIndex;
                    mapControl.Children.Add(push);
                    locIndex++;
                }
                //
                MapPolyline routeLine = new MapPolyline()
                {
                    Locations = locs,
                    Stroke = new SolidColorBrush(Colors.Blue),
                    StrokeThickness = 5
                };
                routeLine.Cursor = Cursors.Hand;
                mapControl.Children.Add(routeLine);
            }
            catch (Exception exc)
            {
                MainWindow main = Application.Current.MainWindow as MainWindow;
                main.Content = new MapPage();
                MessageBox.Show("Choose other file! ", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }

        void m_Map_LayoutUpdated(object sender, EventArgs e)
        {
            if (!isRemoved)
            {
                RemoveOverlayTextBlock();
            }
        }

        void RemoveOverlayTextBlock()
        {
            var textBlock = mapControl.DescendantsAndSelf()
                           .OfType<TextBlock>()
                           .SingleOrDefault(d => d.Text.Contains("Invalid Credentials") ||
                                                 d.Text.Contains("Unable to contact Server"));
            if (textBlock != null)
            {
                var parentBorder = textBlock.Parent as Border;
                if (parentBorder != null)
                {
                    parentBorder.Visibility = Visibility.Collapsed;
                }
                isRemoved = true;
            }

        }
    }
}
