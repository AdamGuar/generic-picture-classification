# data-set-splitter

Application used for splitting data sets into train and test sets.

## How it works

For example you have following image set:
```
/my-image-data-set
    /imagesBelongingToCategory1
    /imagesBelongingToCategory2
    /imagesBelongingToCategory3
```

You run data-splitter using following parameters:
```
node bin/index.js -d PATH_TO_DATA_SET/my-image-data-set/ -r 20 -o OUTPUT_PATH_TO_DATA_SET/my-image-data-set-spitted/ 
```

Output will look like
```
/my-image-data-set-spitted
    /train
        /imagesBelongingToCategory1
        /imagesBelongingToCategory2
        /imagesBelongingToCategory3
    /test
        /imagesBelongingToCategory1 // containing 20% of randomly picked images from source set
        /imagesBelongingToCategory2 // containing 20% of randomly picked images from source set
        /imagesBelongingToCategory3 // containing 20% of randomly picked images from source set
```
