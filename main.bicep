param datetime string = utcNow()

module storageModule 'storage.bicep' = {
  name: '${datetime}-storage-module'
  params: {
    storageAccountPrefix: 'test'
    skuName: 'Standard_LRS'
    environment: 'dev'
  }
}

module otherModule 'otherModule.bicep' = {
  name: '${datetime}-other-module'
  params: {
    input: storageModule.outputs.storageAccountName
  }
}
