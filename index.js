const bodyParser = require('body-parser')
const express = require ('express')
const mongoose = require('mongoose')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public/'))
//--------conect 
mongoose.connect('mongodb://127.0.0.1:27017/ella',{useNewUrlParser:true,useUnifiedTopology:true})
const conexion= mongoose.connection
conexion.once('open',()=>{
      console.log("chido")
})
conexion.once('error',(err)=>{
    console.log(' no chido', err.message)
})
///-------------------------------------------------------------modelos--------------------------------
const Analisis= mongoose.model('analisis',{_idpaciente:String,_idlaboratorio:String,estudio:[]},'analisis')
const Antecedentes= mongoose.model('antecedentes',{_idpaciente:String,afecciones:{fechainicio:Date},medicamentos:[],habitos:[],antecedentes:{},relaciones:{ultimafecha:Date},embarazo:{aliviofecha:Date},aborto:{abortofecha:Date}},'antecedentes')
const Anticonceptivos= mongoose.model('anticonceptivo',{_idpaciente:String,metodo:String,fechainicio:Date,efectividad:Number,efectosec:[]},'anticonceptivo')
const Ciclo= mongoose.model('ciclo',{_idpaciente:String,cicloa:[],cicloh:{},variacion:Number,duracion:Number},'ciclo')
const Consultas= mongoose.model('consultas',{_idpaciente:String,consulta:{},consultah:{}},'consultas')
const Expediente= mongoose.model('expediente',{_idpaciente:String,alergias:{},tiposangre:String,Altura:Number,peso:Number,Genero:String,_iddoctor:String},'expediente')
const Laboratorios= mongoose.model('laboratorios',{nombre:String,contacto:{},horario:String,domicilio:{tipo:Number,calle:String,numero:Number,colonia:String,cp:Number,municipio:String,estado:String,pais:String}},'laboratorios')
const Medicamentos= mongoose.model('medicamentos',{_idpaciente:String,nombre:String,dosis:{},fechainicio:Date,fechafin:Date,efectos:[],notas:[]},'medicamentos')
const Quiste= mongoose.model('quiste',{lugar:String,datos:{},cancer:String, removido:String,_idpaciente:String},'quiste')
const Sintomas= mongoose.model('sintomas',{_idpaciente:String,sintoma:String,frecuencia:String,duracion:String,intensidad:String},'sintomas')
const Usuario= mongoose.model('usuario',{nombre:String,apepat:String,apemat:String,edad:Number,usuario:String,pass:String,domicilio:{tipo:Number,calle:String,numero:Number,colonia:String,cp:Number,municipio:String,estado:String,pais:String},contacto:{}},'usuario')
///------------------------------------------------------------ find's--------------------------------
//----usuario
app.get('/find',(req,res)=>{
    Usuario.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----expediente
app.get('/findEX',(req,res)=>{
    Expediente.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----consultas
app.get('/findCO',(req,res)=>{
    Consultas.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----medicamentos
app.get('/findME',(req,res)=>{
    Medicamentos.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----sintomas
app.get('/findSI',(req,res)=>{
    Sintomas.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----ciclomenstrual
app.get('/findCM',(req,res)=>{
    Ciclo.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----quiste
app.get('/findQ',(req,res)=>{
    Quiste.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----analisangre
app.get('/findAN',(req,res)=>{
    Analisis.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----metodoanti
app.get('/findMA',(req,res)=>{
    Anticonceptivos.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----antecedentes
app.get('/findAM',(req,res)=>{
    Antecedentes.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----laboratorios
app.get('/findLAB',(req,res)=>{
    Laboratorios.find({},{_id:0})
    .then(doc=>{
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---------------------------------------------------------- INSERT'S------------------------------------
//----usuario
app.post('/insert',(req,res)=>{
    const user= new Usuario({nombre:req.body.nombre,apepat:req.body.apepat,apemat:req.body.apemat,edad:req.body.edad,usuario:req.body.usuario,pass:req.body.pass,tipo:req.body.tipo,domicilio:{calle:req.body.calle,numero:req.body.numero,colonia:req.body.colonia,cp:req.body.cp,municipio:req.body.municipio,estado:req.body.estado,pais:req.body.pais},contacto:{tel:Number(req.body.tel),casa:Number(req.body.casa)}})
    user.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----analisis
app.post('/insertAN',(req,res)=>{
    const analis= new Analisis({_idpaciente:req.body._idpaciente,_idlaboratorio:req.body._idlaboratorio,estudio:{fechaToma:Date(req.body.fechaToma),nombrestudio:req.body.estudio,resultado:Number(req.body.resultado),variacion:req.body.variacion}})
    analis.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----antecedente medicos
app.post('/insertAM',(req,res)=>{
    const ante= new Antecedentes({_idpaciente:req.body._idpaciente,afecciones:{tipo:req.body.tipo,fechainicio:req.body.fechainicio},medicamentos:[req.body.medicamentos],habitos:[req.body.medicamentos],antecedentes:{parentezco:req.body.parentezco,enfermedad:req.body.enfermedad,edad:Number(req.body.edad)},relaciones:{ultimafecha:req.body.fecha,nparejas:Number(req.body.parejas),frecuencia:req.body.frecuencia},embarazo:{aliviofecha:req.body.fechalivio,sexo:req.body.sexo,complicaciones:req.body.complicaciones},aborto:{abortofecha:req.body.fechaborto,causa:req.body.causa}})
    ante.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Metodos Anticonceptivos
app.post('/insertMA',(req,res)=>{
    const metodo= new Anticonceptivos ({_idpaciente:req.body._idpaciente,metodo:req.body.metodo,fechainicio:req.body.fechainicio,efectividad:Number(req.body.efectividad),efectosec:[req.body.efectosec]})
    metodo.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---- Ciclo
app.post('/insertCM',(req,res)=>{
    const regla= new Ciclo ({_idpaciente:req.body._idpaciente,cicloa:{fechainicio:req.body.fechainicio,fechafin:req.body.fechafin,duracion:req.body.duracion},cicloh:{fechainicio:req.body.fechainicioh,fechafin:req.body.fechafinh,duracion:req.body.duracionh},variacion:req.body.variacion,duracion:req.body.variacion})
    regla.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Consultas
app.post('/insertCO',(req,res)=>{
    const consulta= new Consultas({_idpaciente:req.body._idpaciente,consulta:{fecha:req.body.fecha,hora:req.body.hora,peso:Number(req.body.peso)},consultah:{}})
    consulta.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Expediente
app.post('/insertEX',(req,res)=>{
    var sint = ["mareo", "haqueca", "vomito"]
    const exp = new Expediente({_idpaciente:req.body._idpaciente,alergias:[ { sintomas: [req.body.sintomas, "dolor", "muerte" ], causa:req.body.causa,complicacion:req.body.complicacion } ],tiposangre:req.body.tiposangre,Altura:Number(req.body.altura),peso:Number(req.body.peso),Genero:req.body.genero,_iddoctor:req.body._iddoctor})
    exp.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Laboratorios
app.post('/insertLAB',(req,res)=>{
    console.log("body: " + req.body)
    const lab= new Laboratorios({nombre:req.body.nombre,contacto:{tel:Number(req.body.tel)},horario:req.body.horario,domicilio:{calle:req.body.calle,numero:req.body.numero,colonia:req.body.colonia,cp:req.body.cp,municipio:req.body.municipio,estado:req.body.estado,pais:req.body.pais}})
    lab.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Medicamentos
app.post('/insertME',(req,res)=>{
    const medi= new Medicamentos({_idpaciente:req.body._idpaciente,nombre:req.body.nombre,dosis:{cantidad:req.body.cantidad,frecuencia:req.body.frecuencia},fechainicio:Date(req.body.fechainicio),fechafin:Date(req.body.fechafin),efectos:[req.body.efectos],notas:[req.body.notas]})
    medi.save()
    .then(doc=>{
        console.log("Info: "+req.body)
        console.log('infor insertada')
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Quiste
app.post('/insertQ',(req,res)=>{
    const quiste= new Quiste({lugar:req.body.lugar,datos:{tamaño:req.body.tamaño,fecha:req.body.fecha},cancer:req.body.cancer, removido:req.body.removido,_idpaciente:req.body._idpaciente})
    quiste.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//----Sintomas
app.post('/insertSI',(req,res)=>{
    const sintoma= new Sintomas({_idpaciente:req.body._idpaciente,sintoma:req.body.sintoma,frecuencia:req.body.frecuencia,duracion:req.body.frecuencia,intensidad:req.body.intensidad})
    sintoma.save()
    .then(doc=>{
        console.log('infor insertada',)
        res.json({response:'succes',data:doc})
    })
    .catch(err=>{
        console.log(' error en la consulta', err.message)
    })
})
//---------------------------------------------------------- UPDATE'S------------------------------------
//---------------------------------------------------------- DELET'S------------------------------------
//----usuario
app.get('/delete/:id',(req,res)=>{
    const id= req.params.id
    Usuario.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Analisis de sangre
 app.get('/deleteAN/:id',(req,res)=>{
    const id= req.params.id
    Analisis.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Antecedentes
 app.get('/deleteAM/:id',(req,res)=>{
    const id= req.params.id
    Antecedentes.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Metodo Anticonceptivo
 app.get('/deleteMA/:id',(req,res)=>{
    const id= req.params.id
    Anticonceptivos.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Ciclo
 app.get('/deleteCM/:id',(req,res)=>{
    const id= req.params.id
    Ciclo.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Consultas
 app.get('/deleteCO/:id',(req,res)=>{
    const id= req.params.id
    Consultas.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Expediente
 app.get('/deleteEX/:id',(req,res)=>{
    const id= req.params.id
    Expediente.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Laboratorios
 app.get('/deleteLAB/:id',(req,res)=>{
    const id= req.params.id
    Laboratorios.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Medicamentos
 app.get('/deleteME/:id',(req,res)=>{
    const id= req.params.id
    Medicamentos.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Quiste
 app.get('/deleteQ/:id',(req,res)=>{
    const id= req.params.id
    Quiste.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
 //----Sintomas
 app.get('/deleteSI/:id',(req,res)=>{
    const id= req.params.id
    Sintomas.findByIdAndDelete({_id:id})
     .then(doc=>{
         res.json({response:'succes eliminado',data:doc})
     })
     .catch(err=>{
         console.log(' error en la consulta', err.message)
     })
 })
////////////////////////////////////
app.listen(3001)
console.log('server ON')