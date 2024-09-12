import stone
import csv
from json import dumps
from os import walk


photo_dir = "./data/images/faces/"
distdata_base_path = './data/districts/distdata_base.csv';
distdata_path = './data/districts/distdata.csv';

# Paleta PERLA
tone_palette = [
    "#302d24",
    "#3d230b",
    "#4a392e",
    "#664b39",
    "#785e4b",
    "#917153",
    "#b29679",
    "#dbbe95",
    "#deb6ad",
    "#ebd0ce",
    "#ebd0ce"
]

tone_labels = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K"
]

# cvedis_tones = []

r = csv.reader(open(distdata_base_path)) # Here your csv file
distdata = list(r)

def update_distdata(cvedis,tone,dominant,file):
    print("update_distdata",cvedis,tone,dominant,file)
    for line in distdata:
        # print(line[0],line[9],cvedis,tone)
        if (line[0] == cvedis):
            line[12] = tone
            line[13] = dominant
            line[14] = file
            break

def classify_perla(file):
    # print("classify_perla",file)
    # process the image
    # try:

    # Process the image and return the result.
    # :param filename_or_url: The filename (in local devices) or URL (in Internet) of the image.
    # :param image_type: Specify whether the input image(s) is/are colored or black/white.
    #        Valid choices are: "auto", "color" or "bw", Defaults to "auto", which will be detected automatically.
    # :param tone_palette: Skin tone palette; Supports RGB hex value leading by "#" or RGB values separated by comma(,).
    #        E.g., ['#373028', '#422811'] or ['255,255,255', '100,100,100']
    # :param tone_labels: Skin tone labels; default values are the uppercase alphabet list leading by the image type
    #        ('C' for 'color'; 'B' for 'Black&White'), e.g., ['CA', 'CB', ..., 'CZ'] or ['BA', 'BB', ..., 'BZ'].
    # :param convert_to_black_white: Whether to convert the image to black/white before processing. Defaults to False.
    # :param n_dominant_colors: Number of dominant colors to be extracted from the image. Defaults to 2.
    # :param new_width: Resize the images with the specified width. Negative value will be ignored, defaults to 250.
    # :param scale: How much the image size is reduced at each image scale. Defaults to 1.1.
    # :param min_nbrs: How many neighbors each candidate rectangle should have to retain it.
    #        Higher value results in less detections but with higher quality, defaults to 5.
    # :param min_size: Minimum possible face size. Faces smaller than that are ignored, defaults to (90, 90).
    # :param threshold: What percentage of the skin area is required to identify the face, defaults to 0.15.
    # :param return_report_image: Whether to return the report image(s) in the result. Defaults to False.

    result = stone.process(
        dirpath+file,
        tone_palette=tone_palette,
        tone_labels=tone_labels,
        image_type="color",
        # convert_to_black_white=False,
        n_dominant_colors=3, #2,
        # new_width=100,
        scale=2,
        # min_nbrs=15,
        # min_size=(90, 90),
        # threshold=0.1,
        # return_report_image=False,
    )

    cvedis = file.split("__")[0]
    tone = result["faces"][0]["skin_tone"]
    dominant = result["faces"][0]["dominant_colors"][0]["color"];

    # cvedis_tones.extend([cvedis,tone])

    update_distdata(cvedis,tone,dominant,file)


for (dirpath, dirnames, filenames) in walk(photo_dir):
    print("Cantidad de fotos",len(filenames))
    
    for file in filenames:
        classify_perla(file)


# print(cvedis_tones)
# dumps(results)





with open(distdata_path, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(distdata)