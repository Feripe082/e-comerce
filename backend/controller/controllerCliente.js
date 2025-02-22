const {Cliente} = require('../model/associacao')

const cadastrarCliente = async(req,res)=>{
    const valores = req.body

    try{
        const pesq = await Cliente.create(valores,{raw:true})
        res.status(200).json({messgae:'Dados cadastrados'})
    }catch(err){
        console.error('Deu ruim',err)
        res.status(500).json({messgae:'Erro ao cadastrar'})
    }
        
}

    const listarCliente = async (req,res)=>{
        try{
            const pesq = await Cliente.findAll()
            res.status(200).json(pesq)
        }catch(err){
            console.error('Erro a listar Cliente!',err)
            res.status(500).json({message: 'Erro a listar!'})
        }
    }
    
    const consultarCliente = async (req,res)=>{
        const valor = req.query
        console.log(valor)
        try{
            const pesq = await Cliente.findOne({where: { codCliente: valor.codCliente}})
            if(pesq === null){
                console.log('Não encontrada no banco de dados!')
                res.status(404).json({message: "Não encontrada no banco de dados!"})
            }else{
                console.log(pesq)
                res.status(200).json(pesq)
            }
        }catch(err){
            console.error('Erro a consultar o Cliente!',err)
            res.status(500).json({message: 'Erro a consultar!'})
        }
    }
    
    const apagarCliente = async (req,res)=>{
        const valor = req.params
        console.log(valor)
        try{
            const pesq = await Cliente.findByPk(valor.id)
            if(pesq === null){
                console.log(pesq)
                res.status(404).json({message: "Cliente não existe no banco de dados!"})
            }else{
                await Cliente.destroy({where: { codCliente: valor.id}})
                res.status(200).json({message: "Cliente Excluído do banco de dados!"})
            }
        }catch(err){
            console.error('Erro ao excluir o Cliente!',err)
            res.status(500).json({message: 'Erro ao excluir o Cliente!'})
        }
    }
    
    const atualizarCliente = async (req,res)=>{
        const valores = req.body
        console.log(valores)
        try{
            const pesq = await Cliente.findByPk(valores.codCliente)
            if(pesq === null){
                console.log(pesq)
                res.status(404).json({message: "Cliente não encontrado no banco de dados!"})
            }else{
                await Cliente.update(valores, {where: { codCliente: valores.codCliente}})
                const pesq2 = await Cliente.findByPk(valores.codCliente)
                res.status(200).json(pesq2)
            }
        }catch(err){
            console.error('Erro ao atualizar o Cliente!',err)
            res.status(500).json({message: 'Erro ao atualizar o Cliente!'})
        }
    }



module.exports = {cadastrarCliente, listarCliente, consultarCliente, apagarCliente, atualizarCliente}