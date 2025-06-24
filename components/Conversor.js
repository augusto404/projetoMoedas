import React, { useEffect, useState } from 'react';
import{ TouchableHighlight, TextInput, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native-web';
import { chaveAPI } from "./chaveAPI";

const [valor, setValor] = useState('');
const [moedaOrigem, setMoedaOrigem] = useState('USD');
const [moedaConvertida, setMoedaConvertida] = useState('BRL');
const [resultado, setResultado] = useState(null);

useEffect( () => {
    const converterMoeda = async () => {
        try{

            const resposta = await
            fetch(`Https://v6.exchangerate-api.com/v6/${chaveAPI}/latest/${moedaOrigem}`)
            const dados = await resposta.json();
            const taxa = dados.conversion_rates[moedaConvertida];
            setResultado(valor * taxa);
        } catch(error) {
            console.log(error);
            setResultado('Erro na conversão: '+error);
        }

        if (resultado !== null){
            converterMoeda();
        }
    }
},[resultado]);

    render() {
        return(
            <View>
                    <TextInput
                        placeholder='Digite um valor'
                        keyboardType="numeric"
                        onChangeText={setValor}
                        value = {valor}
                    />

                <View>
                    <Picker
                    selectedValue={moedaOrigem}
                    onValueChange={() => setMoedaOrigem()}>
                        <Picker.item label="USD" value="USD" />
                        <Picker.item label="EUR" value="EUR" />
                        <Picker.item label="BRL" value="BRL" />
                    </Picker>
                    <Picker
                    selectedValue={moedaConvertida}
                    onValueChange={() => setMoedaConvertida()}>
                        <Picker.item label="USD" value="USD" />
                        <Picker.item label="EUR" value="EUR" />
                        <Picker.item label="BRL" value="BRL" />
                    </Picker>
                </View>

                <TouchableOpacity>
                    <Text>Converter</Text>
                </TouchableOpacity>

                {resultado !== null &&
                <View>
                    <Text>O valor convertido é de:</Text>
                    <Text>{typeof resultado === 'number' ? resultado.toFixed(2) : resultado}</Text>
                </View>
                }
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titulo: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'black',
        backgroundColor: 'white',
    },
    botao: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stertch',
        justifyContent: 'center',
    },
    botaoText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default conversorMoedas;