array = [0]*100

def readFile():
    myFile = open('Test.txt', 'r')
    line = myFile.readline()
    print(line)
    arr = line.split(',');
    print(arr)
    for i in range(len(arr)):
        array[i] = arr[i]
    myFile.close()

print(array)
readFile()
print(array)