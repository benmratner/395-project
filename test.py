import essentia

import essentia.standard
import essentia.streaming

loader = essentia.standard.MonoLoader(filename="./Sleepyhead.mp3")

audio = loader()

# pylab contains the plot() function, as well as figure, etc... (same names as Matlab)
from pylab import plot, show, figure, imshow
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = (15, 6) # set plot sizes to something larger than default

plot(audio[1*44100:2*44100])
plt.title("This is how the 2nd second of this audio looks like:")
show() # unnecessary if you started "ipython --pylab"