class StatsModel {
    categories: {
        categoryName: string,
        images: any[]
    }[] = []
    labels: { labelName: string, labelId: number }[] = []
}


class TensorModel {
    images: any[] = []
    labels: any[] = []
}

export { StatsModel, TensorModel }